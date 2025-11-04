"use client";

import type { ChatMessage } from "@/lib/types";
import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import {
    BarChart3,
    Calendar,
    Database,
    FileText,
    Globe,
    PieChart,
    Target,
    TrendingUp
} from "lucide-react";
import { memo } from "react";
import { Button } from "./ui/button";
import type { VisibilityType } from "./visibility-selector";

type SuggestedActionsProps = {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  selectedVisibilityType: VisibilityType;
};

function PureSuggestedActions({ chatId, sendMessage }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      icon: Database,
      text: "Consolidate financial data from all subsidiaries",
    },
    {
      icon: FileText,
      text: "Generate the monthly income statement",
    },
    {
      icon: Calendar,
      text: "Reconcile the bank accounts for March",
    },
    {
      icon: Globe,
      text: "Book a journal entry",
    },
    {
      icon: Target,
      text: "Provide a 12-month cash flow forecast",
    },
    {
      icon: BarChart3,
      text: "Generate the quarterly profit and loss statement",
    },
    {
      icon: TrendingUp,
      text: "Show the budget variance for Q1 compared to actuals",
    },
    {
      icon: PieChart,
      text: "Create a real-time financial performance dashboard",
    },
  ];

  return (
    <div
      className="grid w-full gap-3 sm:grid-cols-2"
      data-testid="suggested-actions"
    >
      {suggestedActions.map((action, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          key={action.text}
          transition={{ delay: 0.05 * index }}
        >
          <Button
            variant="outline"
            className="h-auto w-full justify-start gap-3 p-4 text-left hover:bg-accent/50 transition-colors"
            onClick={() => {
              window.history.replaceState({}, "", `/chat/${chatId}`);
              sendMessage({
                role: "user",
                parts: [{ type: "text", text: action.text }],
              });
            }}
          >
            <action.icon className="h-5 w-5 shrink-0 text-muted-foreground" />
            <span className="text-sm whitespace-normal">{action.text}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) {
      return false;
    }
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) {
      return false;
    }

    return true;
  }
);
