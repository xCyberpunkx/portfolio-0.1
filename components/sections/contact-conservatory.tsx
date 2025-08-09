"use client"

import socials from "@/data/socials.json"
import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Social = { id: string; name: string; url: string }

type Note = { id: string; name: string; message: string }

export default function ContactConservatory({ defaultProps }: { defaultProps: {} }) {
  const [sent, setSent] = useState<boolean>(false)
  const [notes, setNotes] = useState<Note[]>([])
  const list = useMemo(() => socials as Social[], [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("museum:seen-sections")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("contact-conservatory")) {
        arr.push("contact-conservatory")
        localStorage.setItem("museum:seen-sections", JSON.stringify(arr))
      }
      const n = localStorage.getItem("museum:notes")
      setNotes(n ? JSON.parse(n) : [])
    } catch {}
  }, [])

  const addNote = (note: Note) => {
    const next = [note, ...notes].slice(0, 30)
    setNotes(next)
    try {
      localStorage.setItem("museum:notes", JSON.stringify(next))
    } catch {}
  }

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{"Contact Conservatory"}</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {"Floating glass form with animated thanks, swinging socials, and a sticky wall."}
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 bg-background/70 backdrop-blur supports-[backdrop-filter]:border">
          {!sent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
                setTimeout(() => setSent(false), 2400)
              }}
              className="space-y-3"
              aria-label="Contact form"
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" required placeholder="Ada Lovelace" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" required placeholder="Hello!" />
              </div>
              <Button type="submit">Send</Button>
            </form>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-lg animate-in fade-in zoom-in duration-500">
              {"Thank you! Your message has been sent."}
            </div>
          )}
        </Card>
        <div className="grid gap-4">
          <Card className="p-4">
            <div className="text-sm font-semibold mb-2">{"Social Links"}</div>
            <div className="flex flex-wrap gap-3">
              {list.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative px-3 py-1 rounded border inline-block hover:-rotate-2 transition-transform"
                  style={{ transformOrigin: "top center" }}
                  aria-label={s.name}
                >
                  <span className="block">{s.name}</span>
                  <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-2 w-[2px] bg-muted-foreground/40" />
                </a>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-semibold mb-2">{"Leave a Note"}</div>
            <StickyWall onAdd={addNote} notes={notes} />
          </Card>
        </div>
      </div>
    </div>
  )
}

function StickyWall({ onAdd, notes }: { onAdd: (n: Note) => void; notes: Note[] }) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  return (
    <div>
      <form
        className="flex gap-2 mb-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (!name || !message) return
          onAdd({ id: String(Date.now()), name, message })
          setMessage("")
        }}
      >
        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Your note" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button type="submit" variant="secondary">
          Post
        </Button>
      </form>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {notes.map((n) => (
          <div key={n.id} className="p-2 rounded shadow bg-amber-100 rotate-[-2deg]">
            <div className="text-xs font-semibold">{n.name}</div>
            <div className="text-xs">{n.message}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
