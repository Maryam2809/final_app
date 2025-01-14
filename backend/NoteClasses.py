from abc import ABC, abstractmethod

# Abstract Base Class (Abstraction)
class NoteClasses(ABC):
    @abstractmethod
    def add_note(self, data, folder):
        pass

    @abstractmethod
    def edit_note(self, note_id, new_data):
        pass

    @abstractmethod
    def delete_note(self, note_id):
        pass


# Inherited class implementing the abstract methods
class NoteOperations(NoteClasses):
    def __init__(self):
        # Simulate a database with a dictionary
        self.notes = {}
        self.current_id = 1

    # Adding a new note
    def add_note(self, data, folder):
        note_id = self.current_id
        self.notes[note_id] = {"data": data, "folder": folder}
        self.current_id += 1
        return {"status": "success", "note_id": note_id, "message": "Note added successfully"}

    # Editing an existing note (Polymorphism: Overloading behavior based on input)
    def edit_note(self, note_id, new_data):
        if note_id in self.notes:
            self.notes[note_id]["data"] = new_data
            return {"status": "success", "message": "Note updated successfully"}
        return {"status": "error", "message": "Note ID not found"}

    # Deleting an existing note
    def delete_note(self, note_id):
        if note_id in self.notes:
            del self.notes[note_id]
            return {"status": "success", "message": "Note deleted successfully"}
        return {"status": "error", "message": "Note ID not found"}