"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const ToastNotification: React.FC = () => {
  const { notification, dismissNotification } = useCart();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 right-6 z-50 max-w-sm bg-[#0B0B0B] text-white p-3.5 rounded-lg shadow-2xl border border-[#C9A24B]/60 flex items-center gap-3 backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center shrink-0 text-[#0B0B0B]">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-xs text-[#FBF9F4] font-medium flex-1">{notification}</p>
          <button
            onClick={dismissNotification}
            className="p-1 text-gray-400 hover:text-white rounded"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
