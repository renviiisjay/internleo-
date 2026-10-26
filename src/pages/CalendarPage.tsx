import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  Clock,
  Building,
  CheckCircle2,
  Circle,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CalendarEvent } from '../types';

export const CalendarPage: React.FC = () => {
  const { events, addEvent, deleteEvent, toggleEventStatus } = useData();

  const [filterType, setFilterType] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CalendarEvent['type']>('Interview');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');

  const filteredEvents = events
    .filter(e => filterType === 'All' || e.type === filterType)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    addEvent({
      title,
      type,
      date,
      time: time || undefined,
      company: company || undefined,
      notes: notes || undefined,
      status: 'pending'
    });
    setShowAddModal(false);
    setTitle('');
    setTime('');
    setCompany('');
    setNotes('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1EDF8] text-[#2D5F85] text-xs font-semibold mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            Recruitment Schedule
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2D42]">Calendar & Deadlines</h1>
          <p className="text-sm text-[#74788D]">
            Interviews, take-home project deadlines, offer decisions, and check-ins in one unified agenda.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1B1E2B] transition flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Interview', 'Deadline', 'Milestone', 'Follow-up'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              filterType === tab
                ? 'bg-[#2D3142] text-white'
                : 'bg-white/80 border border-[#ECE8E1] text-[#696C80] hover:bg-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events Timeline / List */}
      <div className="bg-white/80 rounded-3xl border border-[#ECE8E1] p-6 shadow-xs space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => {
            const isCompleted = event.status === 'completed';
            const badgeColors =
              event.type === 'Interview'
                ? 'bg-purple-100 text-purple-700'
                : event.type === 'Deadline'
                ? 'bg-rose-100 text-rose-700'
                : event.type === 'Milestone'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-blue-100 text-blue-700';

            return (
              <div
                key={event.id}
                className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-[#FAF9F6] border-[#E8E4DA] opacity-60'
                    : 'bg-white border-[#E6E2D8] hover:border-[#7E61B2]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleEventStatus(event.id)}
                    className="mt-0.5 text-[#9A9EAF] hover:text-emerald-600 transition"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${badgeColors}`}>
                        {event.type}
                      </span>
                      {event.company && (
                        <span className="text-xs font-semibold text-[#665389]">
                          {event.company}
                        </span>
                      )}
                      <h4
                        className={`text-sm font-bold text-[#2B2D42] ${
                          isCompleted ? 'line-through text-[#8E92A4]' : ''
                        }`}
                      >
                        {event.title}
                      </h4>
                    </div>

                    {event.notes && (
                      <p className="text-xs text-[#6F7387]">{event.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <div className="text-right text-xs">
                    <p className="font-bold text-[#2B2D42]">{event.date}</p>
                    {event.time && <p className="text-[#84879C] text-[11px]">{event.time}</p>}
                  </div>

                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="p-1.5 text-[#A0A4B8] hover:text-rose-600 transition rounded-lg"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-xs text-[#8A8E9F]">
            No calendar events found for this filter.
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-md w-full shadow-xl">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">Add Calendar Item</h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Schedule an interview round, submission deadline, or check-in.
            </p>

            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Event Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Technical Screen with Staff SWE"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  >
                    <option value="Interview">Interview</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Milestone">Milestone</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Reminder">Reminder</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Company (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Stripe"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Date</label>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Time (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 14:00 - 15:00"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Notes / Zoom Link</label>
                <textarea
                  rows={2}
                  placeholder="Links, interviewers, or prep requirements"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#6F7387] hover:bg-[#EFECE6] rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#2B2D42] text-white rounded-xl hover:bg-[#1C1E2D] transition cursor-pointer"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
