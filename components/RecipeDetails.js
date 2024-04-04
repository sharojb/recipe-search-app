import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getRecipe } from '../util/recipe';

export async function getServerSideProps({ params: { id } }) {
  try {
    const recipeInfo = await getRecipe(id);
    return {
      props: {
        recipeInfo,
      },
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return {
      notFound: true,
    };
  }
}

export default function RecipeDetails({ recipeInfo }) {
  return (
    <>
      <Head>
        <title>{recipeInfo ? recipeInfo.title : 'Recipe Not Found'}</title>
        <meta
          name="description"
          content={
            recipeInfo
              ? 'Recipe info for ' + recipeInfo.title
              : 'Recipe Not Found Page'
          }
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍴</text></svg>"
        />
      </Head>

      {recipeInfo ? (
        <RecipeInfo {...recipeInfo} />
      ) : (
        <RecipeError />
      )}
      <Link href="/search">
        Return to Search
      </Link>
    </>
  );
}

function RecipeInfo({
  image,
  title,
  readyInMinutes,
  instructions,
  summary,
  extendedIngredients,
}) {
  return (
    <main>
      <h1>{title}</h1>
      <Image
        src={image}
        width={556}
        height={370}
        alt={title}
      />
      <div>
        <p>Time to Make: {readyInMinutes}min</p>
      </div>
      <div>
        <div>
          <h2>Description</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: summary.replace(
                /(href=")[\w-/:\.]+-([\d]+)/g,
                '$1' + '/recipe/' + '$2'
              ),
            }}
          ></div>
        </div>
        <div>
          <h2>Ingredients</h2>
          <ul>
            {extendedIngredients.map((ing, i) => (
              <li key={i}>{ing.original}</li>
            ))}
          </ul>
        </div>
      </div>
      <h2>Steps</h2>
      <div
        dangerouslySetInnerHTML={{ __html: instructions }}
      ></div>
    </main>
  );
}

function RecipeError() {
  return (
    <h1>Recipe Not Found!</h1>
  );
}
