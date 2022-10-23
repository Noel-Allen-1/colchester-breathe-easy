import { useEffect, useState } from "react"
const parse = require('html-react-parser');


function Home({ Component, pageProps }) {
  const [ cbehomes, setCbehomes ] = useState([])
  useEffect(() => {
    (
      async () => {
        const results = await fetch('/api/home');
        const resultsJson = await results.json();
        setCbehomes(resultsJson);
      }
    )();
  }, []);
    return <div className="grid">
            {cbehomes.map((home) => (
                <div className="row" key={home._id}>
                  {parse(home.cbeHomeHead)}
                  {parse(home.cbeHomeBody)}
                </div>
            ))}
          </div>;
}
  
export default Home