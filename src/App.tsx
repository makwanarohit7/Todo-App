import React, { useEffect, useState } from "react";
import NewReminder from "./components/NewReminder";
import ReminderList from "./components/ReminderList";
import Reminder from "./models/Reminder";
import ReminderService from "./services/reminder";
function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await ReminderService.getReminders();
    setReminders(reminders);
  };

  const removeReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const addRemider = async (title: string) => {
    const newRemider = await ReminderService.addReminders(title);
    setReminders([newRemider, ...reminders]);
  };
  return (
    <div className="App">
      <NewReminder onAddReminder={addRemider} />
      <ReminderList items={reminders} onRemoveReminder={removeReminder} />
    </div>
  );
}

export default App;
