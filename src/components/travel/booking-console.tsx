import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftRight, ArrowUpRight, Search, X, Plus, MapPin, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { destinations, travelServices } from "@/data/travel-content";
import { travelApi } from "@/services/travel-api";
import type { TravelServiceId } from "@/types/travel";

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const schema = z.object({
  service: z.enum(['flights','hotels','trains','buses','cabs','packages','flights-trains','hotels-resorts','tours','transportation','honeymoon','group-corporate','family-corporate']),
  tripMode: z.enum(['round-trip', 'one-way', 'multi-city']),
  from: z.string().trim(),
  to: z.string().trim().min(2, 'Choose a destination'),
  departure: z.string().min(1, 'Choose a date'),
  returnDate: z.string(),
  travellers: z.coerce.number().int().min(1).max(12),
  rooms: z.coerce.number().int().min(1).max(6),
  cabinClass: z.enum(['Economy', 'Premium economy', 'Business', 'First']),
  legs: z.array(z.object({
    from: z.string().min(2, 'Choose an origin'),
    to: z.string().min(2, 'Choose a destination'),
    date: z.string().min(1, 'Choose a date')
  }))
}).superRefine((v, c) => {
  const issue = (path: string[], message: string) => c.addIssue({ code: 'custom', path, message });
  if (v.service !== 'hotels' && v.service !== 'hotels-resorts' && v.from.length < 2) issue(['from'], 'Choose an origin');
  if (v.service !== 'hotels' && v.service !== 'hotels-resorts' && v.from.toLowerCase() === v.to.toLowerCase()) issue(['to'], 'Choose a different destination');
  if (v.departure && v.departure < today()) issue(['departure'], 'Choose today or a future date');
  if (v.service === 'hotels' || v.service === 'hotels-resorts' || (v.service === 'flights' && v.tripMode === 'round-trip')) {
    if (!v.returnDate) issue(['returnDate'], 'Choose a return date');
    else if (v.returnDate < v.departure || ((v.service === 'hotels' || v.service === 'hotels-resorts') && v.returnDate === v.departure)) issue(['returnDate'], 'Choose a later date');
  }
  let previous = v.departure;
  v.legs.forEach((l, i) => {
    if (l.from.trim().toLowerCase() === l.to.trim().toLowerCase()) issue(['legs', String(i), 'to'], 'Choose a different city');
    if (l.date < previous) issue(['legs', String(i), 'date'], 'Legs must be in date order');
    previous = l.date;
  });
});

type Values = z.infer<typeof schema>;

export function BookingConsole({ initialService = 'flights' }: { initialService?: TravelServiceId }) {
  const [ideas, setIdeas] = useState(false);
  const [message, setMessage] = useState('');
  const { register, watch, setValue, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: initialService,
      tripMode: 'round-trip',
      from: 'Mumbai',
      to: new URLSearchParams(window.location.search).get('destination') ?? '',
      departure: '',
      returnDate: '',
      travellers: 1,
      rooms: 1,
      cabinClass: 'Economy',
      legs: []
    }
  });

  const { fields, append, remove, replace } = useFieldArray({ control, name: 'legs' });
  const service = watch('service'), mode = watch('tripMode');
  const stay = service === 'hotels';
  const flight = service === 'flights' || !stay;
  const label = travelServices.find(s => s.id === service)?.label ?? 'travel';

  const submit = async (v: Values) => {
    setIdeas(false);
    setMessage('');
    try {
      const result = await travelApi.submitSearch(v);
      setMessage(result.message);
    } catch {
      setMessage('We couldn’t prepare your search. Please try again.');
    }
  };

  const field = (name: 'from' | 'to' | 'departure' | 'returnDate' | 'travellers' | 'rooms', title: string, type = 'text', placeholder = '') => (
    <label className="console-field">
      <span>{title}</span>
      <input
        type={type}
        aria-label={title}
        placeholder={placeholder}
        min={type === 'date' ? today() : 1}
        max={name === 'travellers' ? 12 : name === 'rooms' ? 6 : undefined}
        {...register(name)}
        onFocus={name === 'to' ? () => setIdeas(true) : undefined}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `error-${name}` : undefined}
      />
      {errors[name] && <small id={`error-${name}`} className="field-error">{errors[name]?.message}</small>}
    </label>
  );

  return (
    <section id="plan" className="booking-console" aria-label="Search travel">
      <form onSubmit={handleSubmit(submit)} noValidate>
        <div className="console-options">
          {flight ? (
            <div className="trip-options">
              {(['round-trip', 'one-way', 'multi-city'] as const).map((m) => (
                <label key={m}>
                  <input
                    type="radio"
                    value={m}
                    {...register('tripMode')}
                    onChange={() => {
                      setValue('tripMode', m);
                      replace(m === 'multi-city' ? [{ from: '', to: '', date: '' }] : []);
                    }}
                  />
                  {m === 'round-trip' ? 'Round trip' : m === 'one-way' ? 'One way' : 'Multi city'}
                </label>
              ))}
            </div>
          ) : (
            <span>Find your next {stay ? 'stay' : 'journey'}</span>
          )}
          <span className="preview-badge">PLANNING PREVIEW</span>
        </div>

        <div className="console-fields">
          {!stay && field('from', 'FROM', 'text', 'City or airport')}
          {!stay && (
            <button
              type="button"
              className="swap-button"
              aria-label="Swap origin and destination"
              onClick={() => {
                const from = watch('from');
                setValue('from', watch('to'));
                setValue('to', from);
              }}
            >
              <ArrowLeftRight size={16} />
            </button>
          )}
          <div className="destination-input">
            {field('to', stay ? 'DESTINATION' : 'TO', 'text', stay ? 'Where will you stay?' : 'Where are you going?')}
            {ideas && (
              <div className="search-ideas">
                <div className="flex items-center justify-between">
                  <strong>Popular escapes</strong>
                  <button type="button" aria-label="Close destination ideas" onClick={() => setIdeas(false)}>
                    <X size={18} />
                  </button>
                </div>
                <p>Trending from Mumbai</p>
                <div className="idea-grid">
                  {destinations.slice(0, 6).map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => {
                        setValue('to', d.city, { shouldValidate: true });
                        setIdeas(false);
                      }}
                    >
                      <MapPin size={14} />
                      {d.city}
                      <ArrowUpRight size={12} />
                    </button>
                  ))}
                </div>
                <span>Weekend escapes · International escapes</span>
              </div>
            )}
          </div>
          {field('departure', stay ? 'CHECK-IN' : 'DEPARTURE', 'date')}
          {(stay || (flight && mode === 'round-trip')) && field('returnDate', stay ? 'CHECK-OUT' : 'RETURN', 'date')}
          {field('travellers', stay ? 'GUESTS' : 'TRAVELLERS', 'number')}
          {stay ? (
            field('rooms', 'ROOMS', 'number')
          ) : flight ? (
            <label className="console-field">
              <span>CLASS</span>
              <select {...register('cabinClass')}>
                {['Economy', 'Premium economy', 'Business', 'First'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          ) : null}
          <button className="search-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? <LoaderCircle className="animate-spin" size={18} /> : <Search size={18} />}
            <span>{isSubmitting ? 'Searching…' : `Search ${label === 'Holiday packages' ? 'holidays' : label.toLowerCase()}`}</span>
          </button>
        </div>

        {flight && mode === 'multi-city' && (
          <div className="extra-legs">
            {fields.map((f, i) => (
              <div key={f.id} className="leg-row">
                <label>
                  From
                  <input {...register(`legs.${i}.from`)} placeholder="City" />
                  {errors.legs?.[i]?.from?.message}
                </label>
                <label>
                  To
                  <input {...register(`legs.${i}.to`)} placeholder="City" />
                  {errors.legs?.[i]?.to?.message}
                </label>
                <label>
                  Departure
                  <input type="date" min={today()} {...register(`legs.${i}.date`)} />
                  {errors.legs?.[i]?.date?.message}
                </label>
                <button type="button" aria-label={`Remove flight ${i + 2}`} onClick={() => remove(i)}>
                  <X size={18} />
                </button>
              </div>
            ))}
            {fields.length < 4 && (
              <button type="button" onClick={() => append({ from: watch('to'), to: '', date: '' })}>
                <Plus size={16} /> Add another flight
              </button>
            )}
          </div>
        )}

        <div className="console-foot">
          <span>Go somewhere you’ve never been.</span>
          <span>Live booking is not available yet.</span>
        </div>

        {message && (
          <div role="status" className="search-message">
            <strong>Your journey is taking shape.</strong>
            <p>{message}</p>
            <button type="button" onClick={() => setMessage('')}>
              Edit search <ArrowUpRight size={14}/></button>
          </div>
        )}
      </form>
    </section>
  );
}
