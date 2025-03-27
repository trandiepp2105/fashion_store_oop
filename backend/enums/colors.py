from enum import Enum

class FashionColor(Enum):
    WHITE = "WHITE"
    BLACK = "BLACK"
    GRAY = "GRAY"
    BEIGE = "BEIGE"
    BROWN = "BROWN"
    CREAM = "CREAM"
    NAVY = "NAVY"
    
    RED = "RED"
    BLUE = "BLUE"
    YELLOW = "YELLOW"
    
    PASTEL_PINK = "PASTEL PINK"
    PASTEL_BLUE = "PASTEL BLUE"
    PASTEL_PURPLE = "PASTEL PURPLE"
    PASTEL_YELLOW = "PASTEL YELLOW"
    PASTEL_GREEN = "PASTEL GREEN"
    
    EARTHY_ORANGE = "EARTHY ORANGE"
    OLIVE_GREEN = "OLIVE GREEN"
    CARAMEL_BROWN = "CARAMEL BROWN"
    TERRACOTTA = "TERRACOTTA"
    MUSTARD_YELLOW = "MUSTARD YELLOW"
    
    NEON_GREEN = "NEON GREEN"
    FUCHSIA_PINK = "FUCHSIA PINK"
    METALLIC_SILVER = "METALLIC SILVER"
    METALLIC_GOLD = "METALLIC GOLD"
    OMBRE = "OMBRE"
    
    @classmethod
    def choices(cls):
        return [(color.value, color.name) for color in cls]

