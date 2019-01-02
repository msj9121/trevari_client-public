import Layout from "../containers/Layout";
import Link from "next/link";

const Search = props => {
  return (
    <Layout>
      <div id="search">

        <div id="search_box">
          {props.shows.map(({ show }) => (
            <Link as={`/book/${show.id}`} href={`/book?id=${show.id}`}>
              <div key={show.id} className="search_imgbox">
                <img src={show.image.medium} className="search_img"></img>
                <div className="search_name">{show.name}</div>
              </div>
            </Link>
          ))}
        </div>

        <style jsx>{`
          #search {
            
          }
          #search_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .search_imgbox {
            width: 15%;
            margin: 30px;
          }
          .search_img {
            width: 100%
          }
          .search_name {
            width: 100%
          }
          @media screen and (max-width: 600px) {
            #search_box {
              width: 100%;
            }
          }
        `}</style>

      </div>
    </Layout>
  );
};

Search.getInitialProps = async function () {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data
  };
};

export default Search;