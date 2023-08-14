import { SetMockNodes } from "@/components/Graph/Node";
import { MockDataInterface, MockDetailInterface } from "@/types";
import { Node } from "reactflow";

export async function fetchMockData() {
    // Set the required headers for the API request
    const headers: HeadersInit = {};
  
    // Set the required headers for the API request
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos`,
      {
        headers: headers,
      }
    );
  
    // Parse the response as JSON
    const result:MockDataInterface[] = await response.json();
    const finalResp:Node[] = await SetMockNodes(result);
  
    return finalResp;
}

export async function fetchMockDataDetailsById(id:string) {
  // Set the required headers for the API request
  const headers: HeadersInit = {};
  
  // Set the required headers for the API request
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments/` + id,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  const resp:MockDetailInterface = await response.json();
  return resp;
}