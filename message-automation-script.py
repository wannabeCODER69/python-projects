import pyautogui
import time

# Wait 5 seconds so you can open Instagram Web and click into the chat
print("You have 5 seconds to open Instagram Web and click into the chat window...")
time.sleep(5)

# Send the message n times
for i in range(70):
    pyautogui.write("Ayeza aunty pedo hoti")
    pyautogui.press("enter")
    time.sleep(0.3) # small delay to avoid overloading the system