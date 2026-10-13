"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import { instagramPosts } from "@/data/instagram";

export const InstagramFeedSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#FBF9F4] select-none border-b border-[#C9A24B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8F6B1F] mb-2">
              <svg className="w-3.5 h-3.5 text-[#C9A24B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span>The Social Runway</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#0B0B0B]">
              Follow @chiccouture
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6458] mt-1 font-light">
              Tag #WearConfidence and #MaisonChic to be featured on our official global journal.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B0B0B] text-white hover:bg-gold-gradient hover:text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded shadow"
          >
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6-Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="group relative aspect-square rounded-lg overflow-hidden bg-[#F3EFE6] border border-[#C9A24B]/20 block shadow-sm hover:shadow-xl transition-all"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                <div className="flex justify-end">
                  <svg className="w-4 h-4 text-[#E6C879]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>

                <div>
                  <p className="text-[10px] text-[#E5DFC9] line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-white/90">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-[#E6C879] fill-current" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-[#E6C879]" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
