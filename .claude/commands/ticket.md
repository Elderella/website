---
description: Fetch a Linear bug ticket and enter plan mode with full context
---

Fetch Linear ticket and prepare for bug fixing.

**Input:** $ARGUMENTS

## Instructions

1. **Fetch the ticket** using linear-cli:
   ```bash
   /Users/mike/elderella/tools/linear-cli/linear-cli fetch "$ARGUMENTS"
   ```
   This returns JSON with: identifier, title, description, url, state, labels, comments, and downloaded attachment paths.

2. **Read any downloaded attachments** using the Read tool so they're visible in context.
   The CLI downloads images to `/tmp/linear-attachments/` and lists them in the `attachments` array.

3. **Update the ticket status to "In Progress"**:
   ```bash
   /Users/mike/elderella/tools/linear-cli/linear-cli status "IDENTIFIER" "In Progress"
   ```

4. **Enter plan mode** by using the EnterPlanMode tool

5. **Present the bug context** clearly:
   ```
   ## Bug: [IDENTIFIER] - [TITLE]

   **Status:** Updated to "In Progress"
   **Linear URL:** [URL from response]
   **Labels:** [LABELS]

   ### Description
   [DESCRIPTION FROM TICKET - strip markdown image syntax]

   ### Screenshot(s)
   [DISPLAY DOWNLOADED IMAGES]

   ### Comments
   [DISPLAY COMMENTS - show author, date, and body for each]

   ### Next Steps
   Ready to investigate and plan the fix.
   ```

## Error Handling

- If the ticket is not found, the CLI will exit with an error message
- If LINEAR_API_KEY is not set, the CLI will inform the user
- If attachments fail to download, the CLI continues and notes the failure

## Example Usage

```
/ticket ELD-123
/ticket https://linear.app/elderella/issue/ELD-123/fix-login-button
```
