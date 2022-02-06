import Item from "./Item";
import "./Transaction.css";

export default function Transaction(props) {
  const { items } = props;
  return (
    <div>
      <ul className="item-list">
        {items.map((e) => {
          return <Item {...e} key={e.id} />;
        })}
      </ul>
    </div>
  );
}
