interface IMetodosDePago {
  debito: Boolean,
  credito: Boolean
}

export interface IProducto {
  id: String,
  nombre: String,
  precio: Number,
  categoria: String,
  stock: Number,
  vendedor: String,
  metodosDePago: IMetodosDePago,
  isActivo: Boolean
};
