import { NextRequest, NextResponse } from "next/server";
import { MENU_ITEMS } from "@/config/menu";

export interface ChatResponsePayload {
  sessionId: string;
  output: string;
  quickReplies?: string[];
  actionCard?: {
    itemId: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatInput, message: rawMessage, sessionId = `session_${Date.now()}` } = body;
    const message = chatInput || rawMessage;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || "https://bilal.iambilalhussain.com/webhook/55883c55-49d5-422d-ad6a-2d2b4f485a59/chat"; // Updated webhook URL

    // Attempt external n8n webhook request if configured and not placeholder default
    if (process.env.N8N_WEBHOOK_URL && !process.env.N8N_WEBHOOK_URL.includes("your-n8n-instance.com")) {
      console.log('🔔 Sending to n8n webhook:', n8nWebhookUrl, { sessionId, chatInput: message, message, timestamp: new Date().toISOString() });
      try {
        const n8nRes = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            chatInput: message, // n8n expects `chatInput`
            message,
            timestamp: new Date().toISOString(),
          }),
        });

        if (n8nRes.ok) {
          const n8nData = await n8nRes.json();
          // Normalize n8n response payload
          return NextResponse.json({
            sessionId,
            output: n8nData.output || n8nData.text || n8nData.message || "Thank you for reaching out!",
            quickReplies: n8nData.quickReplies || n8nData.options || [],
            actionCard: n8nData.actionCard || null,
          });
        }
      } catch (n8nErr) {
        console.warn("n8n Webhook connection attempt failed, defaulting to Barista AI fallback engine:", n8nErr);
      }
    }

    // --- FALLBACK AI BARISTA ENGINE ---
    // Provides rich, realistic coffee shop responses with quick reply buttons and action cards when n8n is pending configuration
    const query = chatInput?.toLowerCase().trim() || "";
    let responseText = "";
    let quickReplies: string[] = [];
    let actionCard = null;

    if (query.includes("menu") || query.includes("drink") || query.includes("what do you have") || query.includes("coffee")) {
      responseText = "☕ **Here are our top customer favorites today!** All made with fresh direct-trade single-origin espresso & organic milks:";
      quickReplies = ["Artisan Iced Latte", "Nitro Cold Brew", "Ceremonial Matcha", "Fresh Pastries"];
      const recommended = MENU_ITEMS[0];
      actionCard = {
        itemId: recommended.id,
        name: recommended.name,
        price: recommended.price,
        image: recommended.image,
        description: recommended.description,
      };
    } else if (query.includes("hour") || query.includes("open") || query.includes("time") || query.includes("location") || query.includes("where")) {
      responseText = "📍 **Velvet & Bean Locations & Hours**:\n• **San Francisco Flagship**: 742 Evergreen Terrace, Suite 100\n• **Mon - Fri**: 6:30 AM – 7:00 PM\n• **Sat - Sun**: 7:00 AM – 8:00 PM\n\n⚡ *Order ahead on our website for instant pickup in under 10 minutes!*";
      quickReplies = ["Order Ahead Now", "View Full Menu", "Dietary Options"];
    } else if (query.includes("size") || query.includes("small") || query.includes("medium") || query.includes("large")) {
      responseText = "🥤 We offer 3 hand-crafted beverage sizes:\n• **Small (12 oz)** — Balanced espresso ratio\n• **Medium (16 oz)** — Most popular regular size\n• **Large (20 oz)** — Double espresso boost\n\nWhat size would you like to add to your order?";
      quickReplies = ["Small (12oz)", "Medium (16oz)", "Large (20oz)"];
    } else if (query.includes("vegan") || query.includes("gluten") || query.includes("dietary") || query.includes("milk")) {
      responseText = "🌱 **Dietary Options & Plant Milks**:\nWe offer **Oat Milk**, **Almond Milk**, and **Coconut Milk** at no extra charge! Most of our cold brews, matcha drinks, and teas are 100% Vegan & Gluten-Free.";
      quickReplies = ["View Vegan Drinks", "Golden Almond Croissant", "Order Iced Latte"];
    } else if (query.includes("order") || query.includes("buy") || query.includes("checkout") || query.includes("cart")) {
      responseText = "🛒 You can customize and place your order directly through our interactive online menu! Would you like me to show you our popular cold brew or iced oat latte?";
      quickReplies = ["Artisan Iced Latte", "Velvet Nitro Cold Brew", "View All Items"];
    } else if (query.includes("automation") || query.includes("b2b") || query.includes("template") || query.includes("website") || query.includes("buy this")) {
      responseText = "🚀 **Looking to boost your cafe's revenues by 35%?**\nThis website and n8n AI Assistant package is available fully white-labeled for local cafes! It handles 24/7 customer orders, inquiries, and loyalty tracking.";
      quickReplies = ["View B2B Demo & Pricing", "Try White-Label Themes", "Book Consultation"];
    } else {
      responseText = `Welcome to Velvet & Bean! ☕ I'm your virtual Barista AI. I can help you check our seasonal menu, customize drink options, or place a quick pickup order. How can I treat you today?`;
      quickReplies = ["Recommend a Drink", "Store Hours & Location", "Dietary Options", "Cafe Automation B2B"];
    }

    return NextResponse.json<ChatResponsePayload>({
      sessionId,
      output: responseText,
      quickReplies,
      actionCard: actionCard || undefined,
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
