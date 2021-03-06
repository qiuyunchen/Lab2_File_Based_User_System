const displayObj = (obj) =>{
    const str = JSON.stringify(obj);
    const blockStyle = `style='margin-inline-start:20px;margin-block-start:0em;margin-block-end:0em'`;
    
    return `{
    <blockquote ${blockStyle}>
        ${str.slice(1,-1)
        .split('"').join('')
        .split(':').join(': ')
        .split(',').join(', ')
        .split('#').join("'")
        .split('class:').join("<br> class:")
        .split('name: ').join("name: '")
        .split(', age').join("', age")
        .split('city: ').join("city: '")
        .split(', grade').join("', grade")
        .split('[').join(`[ <blockquote ${blockStyle}>`)
        .split(']').join('</blockquote> ]')
        .split('{name:').join('<br>{name:')
        .split('><br>{name:').join('>{name:')
        .split('added: <br>').join('added: ')
        .split(`[ <blockquote ${blockStyle}></blockquote> ]`).join('[ ]')
        }
    </blockquote>
    }`;
}

module.exports = {displayObj}