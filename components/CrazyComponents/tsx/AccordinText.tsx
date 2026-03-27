"use client";

import React from "react";
import { motion } from "framer-motion";

export const AccordionText = () => {
    const text = "MLSA";
    const chars = text.split("");

    return (
        <div className="w-full flex ml-20 bg-#13192B overflow-hidden">
            <div className="flex items-end overflow-hidden h-[200px]">
                {chars.map((c, i) => (
                    <motion.div
                        key={i}
                        className="text-8xl md:text-9xl font-bold text-zinc-300 origin-bottom"
                        initial={{ width: "auto", margin: "0" }}
                        whileHover={{
                            scaleY: 1.2,
                            color: "#fff",
                            margin: "0 10px",
                            rotate: i % 2 === 0 ? 5 : -5
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        {c}
                    </motion.div>
                    
                ))}
            </div>
        </div>
    );
};