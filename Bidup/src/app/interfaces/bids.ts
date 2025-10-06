export interface Bid {
  _id?: string;             // ID generado por MongoDB
  product: string;          // ObjectId 
  bidder: string;           // ObjectId 
  amount: number;           // Monto de la oferta    
}