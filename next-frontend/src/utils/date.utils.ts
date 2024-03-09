import { format } from "date-fns";

export default function formatDate(dateString: string): string | null {
  if (dateString) {
    const date = new Date(dateString);
    const formattedDate = format(date, "MM/dd/yyyy hh:mm a");
    return formattedDate;
  }
  return null;
}
