import Link from "next/link";

export default function Auth(props: { url: string }) {
  return (
    <div>
      <Link href={props.url}>Authorize LinkedIn</Link>
    </div>
  );
}
