const Sort = (props) => {
    return ( <div className="sort">
        <p id="filter">فیلتر:</p>
         <select id="sort" name="sort" onChange={props.onChange}>
    <option value="newest">جدید ترین</option>
    <option value="oldest">قدیمی ترین</option>
    <option value="high rating">بیش ترین امتیاز</option>
    <option value="low price">ارزان ترین</option>
    <option value="high price">گران ترین</option>
  </select>
    </div> );
}
 
export default Sort;