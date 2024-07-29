export function Card( {logo, title, time, location, points} ) {

    return (
      <>
        <div className='exp-card'>

          <div className='exp-header'>
            <div className='exp-logo'>
              <img src={ logo.image } alt={ logo.alt } />
            </div>
            <div className='exp-details'>
              <div className='exp-time'>{ time }</div>
              <div className='exp-title'>{ title }</div>
              <div className='exp-location'>
                <div>{ location.institution }</div>
                <div>{ location.city }</div>
              </div>
            </div>
          </div>

          <div className='exp-body'>
            <ul>
              {points.map((entry,index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>

          </div>

      </>
    );
}