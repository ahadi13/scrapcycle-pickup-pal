export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line: string
          area: string | null
          city: string
          created_at: string | null
          id: string
          is_default: boolean | null
          pin_code: string
          title: string
          user_id: string
        }
        Insert: {
          address_line: string
          area?: string | null
          city: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          pin_code: string
          title: string
          user_id: string
        }
        Update: {
          address_line?: string
          area?: string | null
          city?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          pin_code?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_photos: {
        Row: {
          booking_id: string
          created_at: string | null
          id: string
          photo_url: string
        }
        Insert: {
          booking_id: string
          created_at?: string | null
          id?: string
          photo_url: string
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          id?: string
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_photos_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          agent_notes: string | null
          created_at: string | null
          estimated_price: number | null
          final_price: number | null
          id: string
          material_category: Database["public"]["Enums"]["material_category"]
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          pickup_address_id: string
          pickup_date: string
          quantity_estimation: string
          special_instructions: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          time_slot: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_notes?: string | null
          created_at?: string | null
          estimated_price?: number | null
          final_price?: number | null
          id?: string
          material_category: Database["public"]["Enums"]["material_category"]
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          pickup_address_id: string
          pickup_date: string
          quantity_estimation: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          time_slot: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_notes?: string | null
          created_at?: string | null
          estimated_price?: number | null
          final_price?: number | null
          id?: string
          material_category?: Database["public"]["Enums"]["material_category"]
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          pickup_address_id?: string
          pickup_date?: string
          quantity_estimation?: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          time_slot?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_pickup_address_id_fkey"
            columns: ["pickup_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          phone: string | null
          pin_code: string | null
          preferred_language: Database["public"]["Enums"]["app_language"] | null
          push_notifications_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          location_lat?: number | null
          location_lng?: number | null
          phone?: string | null
          pin_code?: string | null
          preferred_language?:
            | Database["public"]["Enums"]["app_language"]
            | null
          push_notifications_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          phone?: string | null
          pin_code?: string | null
          preferred_language?:
            | Database["public"]["Enums"]["app_language"]
            | null
          push_notifications_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_language: "english" | "hindi"
      booking_status:
        | "scheduled"
        | "agent_on_way"
        | "in_progress"
        | "completed"
        | "cancelled"
      material_category:
        | "paper_cardboard"
        | "plastic"
        | "metal"
        | "electronics"
        | "glass"
      payment_method: "upi" | "cash"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_language: ["english", "hindi"],
      booking_status: [
        "scheduled",
        "agent_on_way",
        "in_progress",
        "completed",
        "cancelled",
      ],
      material_category: [
        "paper_cardboard",
        "plastic",
        "metal",
        "electronics",
        "glass",
      ],
      payment_method: ["upi", "cash"],
    },
  },
} as const
