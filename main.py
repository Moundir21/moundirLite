# main.py
import random
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.clock import Clock

WIN_LINES = [
    (0, 1, 2), (3, 4, 5), (6, 7, 8),  # rows
    (0, 3, 6), (1, 4, 7), (2, 5, 8),  # cols
    (0, 4, 8), (2, 4, 6)              # diagonals
]

class TicTacToe(GridLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.cols = 1
        self.status = Label(text="Your turn (X)", size_hint_y=None, height=50)
        self.add_widget(self.status)

        self.board = [""] * 9
        self.grid = GridLayout(cols=3, padding=10, spacing=10)
        self.buttons = []

        for i in range(9):
            btn = Button(text="", font_size=40)
            btn.index = i
            btn.bind(on_release=self.on_human_move)
            self.buttons.append(btn)
            self.grid.add_widget(btn)

        self.add_widget(self.grid)

        controls = BoxLayout(size_hint_y=None, height=60, spacing=10, padding=(10, 0))
        self.reset_btn = Button(text="Restart")
        self.reset_btn.bind(on_release=lambda *_: self.reset())
        controls.add_widget(self.reset_btn)
        self.add_widget(controls)

        self.game_over = False

    def on_human_move(self, btn):
        if self.game_over or self.board[btn.index] != "":
            return
        self.place_mark(btn.index, "X")
        winner = self.check_winner()
        if winner or self.is_draw():
            self.finish(winner)
            return
        self.status.text = "AI thinking… (O)"
        # small delay to feel responsive
        Clock.schedule_once(lambda *_: self.ai_move(), 0.25)

    def ai_move(self):
        if self.game_over:
            return
        empty = [i for i, v in enumerate(self.board) if v == ""]
        if not empty:
            self.finish(None)
            return
        idx = random.choice(empty)
        self.place_mark(idx, "O")
        winner = self.check_winner()
        if winner or self.is_draw():
            self.finish(winner)
        else:
            self.status.text = "Your turn (X)"

    def place_mark(self, idx, mark):
        self.board[idx] = mark
        self.buttons[idx].text = mark
        self.buttons[idx].disabled = True

    def check_winner(self):
        for a, b, c in WIN_LINES:
            if self.board[a] and self.board[a] == self.board[b] == self.board[c]:
                # highlight winning line
                for i in (a, b, c):
                    self.buttons[i].background_color = (0, 1, 0, 1)
                return self.board[a]
        return None

    def is_draw(self):
        return all(self.board) and self.check_winner() is None

    def finish(self, winner):
        self.game_over = True
        if winner is None:
            self.status.text = "It's a draw 🤝"
        elif winner == "X":
            self.status.text = "You win! 🎉"
        else:
            self.status.text = "AI wins! 🤖"
        # disable all remaining buttons
        for i, v in enumerate(self.board):
            if v == "":
                self.buttons[i].disabled = True

    def reset(self):
        self.board = [""] * 9
        self.game_over = False
        self.status.text = "Your turn (X)"
        for btn in self.buttons:
            btn.text = ""
            btn.disabled = False
            btn.background_color = (1, 1, 1, 1)
        # optional: let AI start sometimes
        # if random.random() < 0.5:
        #     Clock.schedule_once(lambda *_: self.ai_move(), 0.2)


class XOApp(App):
    def build(self):
        return TicTacToe()


if __name__ == "__main__":
    XOApp().run()
