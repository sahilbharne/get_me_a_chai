import connectDB from "@/db/connectDb";
import User from "@/models/User";
import PaymentPage from "@/app/components/PaymentPage";
import { notFound } from "next/navigation";

export default async function Username({ params }) {
  // always await the db connect
  await connectDB();

  // use params.username directly because the whole function is async
  const user = await User.findOne({ username: params.username });

  if (!user) {
    notFound();
  }

  return (
    <PaymentPage username={params.username} />
  );
}
