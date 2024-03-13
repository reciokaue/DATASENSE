export default function Page({ params }: { params: { formId: string } }) {
  return <div>My Post: {params.formId}</div>
}
