import BloodRequestDetails from "@/src/components/common/BloodRequestDetails";


interface BloodRequestDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BloodRequestDetailsPage({
  params,
}: BloodRequestDetailsPageProps) {
  const { id } = await params;

  console.log("PAGE ID:", id);

  return <BloodRequestDetails id={id} />;
}
