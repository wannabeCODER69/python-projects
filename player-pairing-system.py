import random


def generate_pairings(players):
    random.shuffle(players)
    pairings = []
    bye_player = None

    if len(players) % 2 != 0:
        bye_player = players.pop()

    for i in range(0, len(players), 2):
        p1 = players[i]
        p2 = players[i + 1]

        if random.choice([True, False]):
            white, black = p1, p2
        else:
            white, black = p2, p1

        pairings.append((white, black))

    return pairings, bye_player


def main():
    print("♟️  Chess Tournament Pairer ♟️")
    print("-" * 35)

    while True:
        try:
            n = int(input("How many players? "))
            if n < 2:
                print("Need at least 2 players!")
            else:
                break
        except ValueError:
            print("Please enter a valid number.")

    players = []
    print("\nEnter Instagram handles (without @):")
    for i in range(1, n + 1):
        while True:
            handle = input(f"  Player {i}: @").strip()
            if handle:
                break
            print("  Handle can't be empty!")
        players.append("@" + handle)

    pairings, bye_player = generate_pairings(players)

    print("\n" + "=" * 40)
    print("       🏆 MATCH PAIRINGS 🏆")
    print("=" * 40)

    for i, (white, black) in enumerate(pairings, 1):
        print(f"\n  Match {i}:")
        print(f"    ⬜ White : {white}")
        print(f"    ⬛ Black : {black}")

    if bye_player:
        print(f"\n  ⚠️  Bye   : {bye_player} (odd player out)")

    print("\n" + "=" * 40)
    print("Good luck to all players! 🎉")


if __name__ == "__main__":
    main()