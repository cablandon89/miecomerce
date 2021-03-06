import {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Store} from '../../store';

const ProductCard = ({id,product}) => {
  //Agregar contador de productos
  const [valueAdd, setValueAdd] = useState(1);
  const [data, setData] = useContext(Store);
  const history = useHistory();
  
  const goDetail = () => {
    history.push(`/detalle/${id}`);
  }
  
  const restar = () => {
    if(valueAdd > 1){
      setValueAdd(valueAdd -1)         
    } 
  }
  
  const sumar = () => {
    if(valueAdd < product.stock){
      setValueAdd(valueAdd +1)         
    } 
  }
  
  const isInCart = (id) => {
    var index = -1;
    for(var i = 0;i<data.id.length;i++){
      if(data.id[i] == id){
        index = i;
      }
    }
    return index;
  }
  
  const addToCart = () => {
    if(isInCart(id) >= 0){
       let cantidadesn = data.cantidades;
       let totaln = data.total - (product.amount * data.cantidades[isInCart(id)]); 
       cantidadesn[isInCart(id)] += valueAdd ;
       totaln = totaln + (product.amount * cantidadesn[isInCart(id)]);
       setData({
         ...data,
         cantidades: cantidadesn,
         total: totaln,
      })
    }else{
      setData({
        ...data, 
        id:[...data.id, id],
        cantidades: [...data.cantidades, valueAdd],
        items: [...data.items, product],
        total: data.total + (product.amount * valueAdd)
      });
    }
  }
  
  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });
  
  return (
    <article>
      <Link to={`/detalle/${id}`}><img src={`assets/img/${id}.jpg`} alt="product" width="200px" height="200px"/></Link>
      <h4>{product.name} </h4>
      <h5>{formatterPeso.format(product.amount)} COP</h5>
      <div className="agregar">
        <i className="icon-minus" onClick={restar}/><input type="text" value={valueAdd} readOnly/><i className="icon-plus" onClick={sumar}/>
      </div>
      <button className="addToCart" onClick={addToCart}>Agregar al carrito</button>
      <button className="addToCart" onClick={goDetail}>Detalles</button>
      
    </article> 
  )
}

export default ProductCard;