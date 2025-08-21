
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Palette, Youtube, ShoppingCart, Info, FileText, Paintbrush, Image as ImageIcon } from 'lucide-react';

const features = [
  {
    title: "Trading Simulator",
    description: "Practice buying and selling in a simulated, real-time market environment.",
    icon: LineChart,
    href: "/dashboard/trading",
  },
  {
    title: "Color Tools",
    description: "Unleash your creativity with a canvas, various brushes, and color options.",
    icon: Palette,
    href: "/dashboard/color-tools",
  },
  {
    title: "Ayush Tube",
    description: "Explore a curated collection of videos on digital art and creativity.",
    icon: Youtube,
    href: "/dashboard/ayush-tube",
  },
    {
    title: "Ayush Store",
    description: "Browse a selection of the finest tools for your creative journey.",
    icon: ShoppingCart,
    href: "/dashboard/store",
  },
  {
    title: "About",
    description: "Learn more about the creator and the project.",
    icon: Info,
    href: "/dashboard/about",
  },
  {
    title: "Paint Tool",
    description: "A simple and fun paint tool to sketch your ideas.",
    icon: Paintbrush,
    href: "/dashboard/paint",
  },
  {
    title: "My Notes",
    description: "Create and manage your personal notes securely.",
    icon: FileText,
    href: "/dashboard/notes",
  },
  {
    title: "Wallpapers",
    description: "Browse and download beautiful wallpapers.",
    icon: ImageIcon,
    href: "/dashboard/wallpapers",
  },
];

export default function Home() {
  const [showFeatures, setShowFeatures] = useState(false);

  const instructionText = `
Remember, the XML structure you generate is the only mechanism for applying changes to the user's code. Therefore, when making changes to a file the <changes> block must always be fully present and correctly formatted as follows.

<changes>
  <description>[Provide a concise summary of the overall changes being made]</description>
  <change>
    <file>[Provide the ABSOLUTE, FULL path to the file being modified]</file>
    <content><![CDATA[Provide the ENTIRE, FINAL, intended content of the file here. Do NOT provide diffs or partial snippets. Ensure all code is properly escaped within the CDATA section.