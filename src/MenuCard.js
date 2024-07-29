function MenuCardLine( {classes, entries, svgs} ) {

    const wrapperClasses = "written-wrapper " + classes;

    return (
        <>    
            {Array.from({ length: entries }, (_, index) => (
            <div key={index} className={wrapperClasses}>
                {svgs[Math.floor(Math.random() * svgs.length)]}
            </div>
            ))}
        </>
    )
}

export function MenuCard( {id, classes, lines, entries, svgs} ) {

    const cardClasses = "menu-option-cover " + classes;

    return(
        <>
        <div id={id} className={cardClasses}>
            <div className="menu-text-wrapper">

                {Array.from({ length: lines }, (_, index) => (
                <div key={index} className='menu-text-line'>
                    <MenuCardLine
                    keys={index} 
                    classes={classes}
                    entries={entries}
                    svgs={svgs}
                    />
                </div>
                ))}

            </div>
        </div>
        </>
    );
}