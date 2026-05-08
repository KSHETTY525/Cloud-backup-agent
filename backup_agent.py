import time
from datetime import datetime

def process_ticket(ticket_description, vm_name):

    logs = []

    logs.append("[INFO] Ticket received")

    time.sleep(1)

    logs.append(
        f"[INFO] Analyzing request: {ticket_description}"
    )

    time.sleep(1)

    description = ticket_description.lower()

    if "backup" in description:

        action = "VM Backup"

        logs.append(
            "[AGENT] Backup intent detected"
        )

        time.sleep(1)

        logs.append(
            f"[INFO] Validating VM: {vm_name}"
        )

        time.sleep(1)

        snapshot_name = f"{vm_name}-snapshot"

        logs.append(
            f"[INFO] Creating backup artifact: {snapshot_name}"
        )

        time.sleep(1)

        logs.append(
            "[SUCCESS] Backup completed successfully"
        )

        status = "SUCCESS"

    else:

        action = "Unknown"

        logs.append(
            "[AGENT] No valid automation intent detected"
        )

        status = "FAILED"

        snapshot_name = None

    return {

        "vm_name": vm_name,
        "action": action,
        "snapshot_name": snapshot_name,
        "status": status,
        "timestamp": str(datetime.now()),
        "logs": logs
    }