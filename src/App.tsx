import { FormEvent, useState } from "react";
import { Loader, Placeholder } from "@aws-amplify/ui-react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";

import { getCurrentUser } from 'aws-amplify/auth';

import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});

function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      
      const { data, errors } = await amplifyClient.queries.askBedrock({
        ingredients: [formData.get("ingredients")?.toString() || ""],
      });
    
      const { username, userId, signInDetails } = await getCurrentUser();

      console.log("username", username);
      console.log("user id", userId);
      console.log("userid", signInDetails?.loginId);
      console.log("useringredients", formData.get("ingredients")?.toString());
      console.log("userrecipe", data?.body);

      const userrecipetosave = data?.body?.toString();

      // Save data to table
      
      /*const { sqlData, sqlErrors } = */ await amplifyClient.mutations.createNewRecipe({
        userid : [signInDetails?.loginId?.toString() || ""] as string,
        useringredients : [formData.get("ingredients")?.toString() || ""] as string,
        userrecipe : [userrecipetosave || ""] as string
      })

   
      if (!errors) {
        setResult(data?.body || "No data returned");
      } else {
        console.log(errors);
      }

/*      if (!sqlErrors) {
        console.log(sqlData?.body || "No SQL data returned");
      } else {
        console.log(sqlErrors);
      }
*/      
        
    } catch (e) {
      alert(`An error occurred: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          Meet Alfred, your AnyCompany
          <br />
          <span className="highlight">Personal Chef</span>
        </h1>
        <p className="description">
          Simply type a few ingredients separated by commas, and Alfred will generate an all-new recipe on demand.
            <br /> <br />
            <span className="example-description">
              For example, try bread, potatoes, cheese, marinara sauce
            </span>
        </p>
        
      </div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            className="wide-input"
            id="ingredients"
            name="ingredients"
            placeholder="bread, potatoes, cheese, marinara sauce...etc"
          />
          <button type="submit" className="search-button">
            Make me a recipe!
          </button>
        </div>
      </form>
      <div className="result-container">
        {loading ? (
          <div className="loader-container">
            <p>Loading...</p>
            <Loader size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
          </div>
        ) : (
          result && <p className="result">{result}</p>
        )}
      </div>
    </div>
  );
}

export default App;



/*

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

*/

