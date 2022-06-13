import React from "react";

interface GrpcFormProps<T> {
  element: T;
  fields: { [fieldName: string]: React.ReactNode };

  onSubmit: (e: T) => void;
}

export default function GrpcForm<T>(props: GrpcFormProps<T>) {
  return <div>GrpcForm</div>;
}
