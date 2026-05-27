import {
  BaggageClaim,
  BookOpen,
  Car,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Luggage,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  type LucideIcon
} from 'lucide-react'

export const CATEGORY_ICON_MAP = {
  Luggage,
  Car,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText
} as const satisfies Record<string, LucideIcon>

export type CategoryIconName = keyof typeof CATEGORY_ICON_MAP

export const CATEGORY_ICONS =
  Object.keys(CATEGORY_ICON_MAP) as CategoryIconName[]