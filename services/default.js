const headerStyle = `style='margin-bottom:20px'`;
const bqStyle = `style='font-size:8px;
                font-style:italic;
                margin-inline-start:20px;
                margin-block-start:0em;
                margin-block-end:0em'`;
const h6Style = `style='font-size:9px;margin:0;padding:0'`;

const defaultHTML = `
<header ${headerStyle}>
    <h1 style="font-size:10pt"> 
        What would you like to do? 
    </h1>
    <span style="font-size:6pt">
        replace all [...] with content of your choice.
    </span>
</header>

<h6 ${h6Style}> Adding students to a class: </h6>
<blockquote ${bqStyle}>
    localhost:3000/class/add/?class=[ex:Physics]&name=[ex:John]&age=[#]&city=[ex:NYC]&grade=[#]
</blockquote> <br>

<h6 ${h6Style}> List all students in a class: </h6>
<blockquote ${bqStyle}>
    localhost:3000/class/list/?class=[ex:Physics]
</blockquote> <br>

<h6 ${h6Style}> List failing students: </h6>
<blockquote ${bqStyle}>
    localhost:3000/class/listfailing/?class=[ex:Physics]
</blockquote> <br>

<h6 ${h6Style}> List students from a specific city: </h6>
<blockquote ${bqStyle}>
    localhost:3000/class/listfromcity/?class=[ex:Physics]&city=[ex:NYC]
</blockquote>
`;

module.exports = {defaultHTML}