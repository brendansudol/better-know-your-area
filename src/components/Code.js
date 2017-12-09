import React from 'react'

const Code = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>

export default Code
