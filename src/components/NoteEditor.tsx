'use client';

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function NoteEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className="min-h-[160px] clean-quill"
      placeholder="Start typing your note here…"
    />
  );
}
