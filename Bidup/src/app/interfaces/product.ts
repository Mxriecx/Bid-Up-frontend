

export interface Product {

    _id: string,
    image :string,
    title: string,
    description :string,
    initialPrice :number,
    finalPrice?: number,
    state? :string,
    category? :string,
    seller :string  // preguntar si seria un ID 
    
}
