// Add Asset Form Payload (Omit auto-generated fields for frontend form)
export type CreateAssetPayload = Omit<
  Asset, 
  'id' | 'created_at' | 'updated_at' | 'created_by'
>;
