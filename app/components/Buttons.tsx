const Buttons: React.FC<{ selected: any, setSelected: any }> = ({ selected, setSelected }) => {
    return (
        <div className="w-72 flex flex-row justify-between mb-12">
            <div className="tooltip tooltip-open tooltip-bottom" data-tip="Soil">
                <button onClick={() => setSelected("soil")} className={`btn btn-square btn-outline btn-lg border-2 ${selected === 'soil' ? 'btn-primary' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24"><path fill="currentColor" d="m15.1 1.81l-2.83 2.83c-.77.78-.77 2.05 0 2.83l1.41 1.41l-4.55 4.55l-2.82-2.83L4.89 12c-4.95 5-1.39 8.5-1.39 8.5S7 24 12 19.09l1.41-1.41l-2.8-2.8l4.54-4.54l1.39 1.39c.78.77 2.05.77 2.83 0L22.2 8.9zm2.83 8.47L16.55 8.9l-1.44-1.44l-1.4-1.4l1.41-1.41l4.23 4.23z" /></svg>
                </button>
            </div>
            <div className="tooltip tooltip-open tooltip-bottom" data-tip="Weather">
                <button onClick={() => setSelected("weather")} className={`btn btn-square btn-outline btn-lg border-2 ${selected === 'weather' ? 'btn-primary' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" fillRule="evenodd" d="M6 14h12a3 3 0 1 0 0-6c-.64 0-1.174-.461-1.436-1.045a5 5 0 0 0-9.128 0C7.174 7.539 6.64 8 6 8a3 3 0 0 0 0 6" clipRule="evenodd" /><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 19v-2m5 3v-3M7 21v-4" /></g></svg>
                </button>
            </div>
            <div className="tooltip tooltip-open tooltip-bottom" data-tip="Vegetation">
                <button onClick={() => setSelected("vegetation")} className={`btn btn-square btn-outline btn-lg border-2 ${selected === 'vegetation' ? 'btn-primary' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24"><path fill="currentColor" d="m7.654 21l-1.385-5.5h11.423L16.308 21zM11.98 8.115q0-2.038 1.548-3.47q1.548-1.433 3.606-1.626q-.212 1.885-1.502 3.285q-1.29 1.4-3.152 1.77v2.445H20v4.173H4V10.52h7.48V8.073q-1.86-.37-3.151-1.76q-1.29-1.39-1.502-3.294q2.038.193 3.596 1.635q1.558 1.442 1.558 3.461" /></svg>
                </button>
            </div>
        </div>
    )
};

export default Buttons;