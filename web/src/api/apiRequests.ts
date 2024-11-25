import axios from "axios";
import { User } from "../types/backend-types";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // Replace with your API URL
});

// Define a function to fetch data
export const fetchUser = async (): Promise<User[]> => {
  const response = await apiClient.get("/api/user/test"); // Adjust endpoint as needed
  // console.log(response.data[0].memberExpiryDate)
  return response.data;
};

//this specific function is experimental. Slightly unsafe to use. Conditionally creates a event checkout, or membership checkout session.
export const fetchCheckoutSecret = async (payload: {
  stripeKey: string;
  isEventTicket: string;
}): Promise<string> => {
  return await fetch("/api/stripe/create-event-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // add our own priceId here later for different products
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};

// the ones below are for a separate approach. Safe to use.
export const fetchEventCheckoutSecret = async (payload: {
  stripeKey: string;
}): Promise<string> => {
  return await fetch("/api/stripe/create-event-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // add our own priceId here later for different products
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};

export const fetchMembershipCheckoutSecret = async (payload: {
  stripeKey: string;
}): Promise<string> => {
  return await fetch("/api/stripe/create-membership-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // add our own priceId here later for different products
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};
