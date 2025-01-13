from datetime import datetime
from collections import defaultdict

def process_notes_for_pie_chart(notes):
    """
    Process notes to get data for the pie chart.
    parameter notes: List of note objects from the database.
    :return: Dictionary with 'labels' and 'values' for the pie chart.
    """
    folder_counts = defaultdict(int)
    for note in notes:
        folder_counts[note["folder"]] += 1

    return {
        "labels": list(folder_counts.keys()),  # ["Personal", "School", "Work"]
        "values": list(folder_counts.values()),  # [12, 99, 50]
    }


def process_notes_for_bar_chart(notes):
    """
    Process notes to get data for the bar chart.
    parameter notes: List of note objects from the database.
    :return: Dictionary with 'x' and 'y' for the bar chart.
    """
    hourly_counts = [0] * 24  # Initialize counts for each hour of the day
    for note in notes:
        date = datetime.fromisoformat(note["date"])  # Convert to datetime object
        hour = date.hour
        hourly_counts[hour] += 1

    return {
        "x": [f"{hour}:00" for hour in range(24)], 
        "y": hourly_counts,  # Counts for each hour
    }
