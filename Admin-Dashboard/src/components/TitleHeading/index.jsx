import "./TitleHeading.css";

const TitleHeadings = ({title, subtitle, elements=0}) => {
  return (
    <div>
        <h1 className='titleHeading-title'>{title} {elements !=0 && "(" + elements + ")"}</h1>
        <p className="titleHeading-subtitle" >{subtitle}</p>
    </div>
  )
}

export default TitleHeadings
