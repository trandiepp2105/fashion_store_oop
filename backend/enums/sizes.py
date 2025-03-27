from enum import Enum

class BaseSizeEnum(Enum):
    # Size áo
    XS = "XS"
    S = "S"
    M = "M"
    L = "L"
    XL = "XL"
    XXL = "XXL"
    XXXL = "XXXL"

    # Size quần
    SIZE_26 = "26"
    SIZE_28 = "28"
    SIZE_30 = "30"
    SIZE_32 = "32"
    SIZE_34 = "34"
    SIZE_36 = "36"
    SIZE_38 = "38"

    # Size váy
    DRESS_XS = "DRESS XS"
    DRESS_S = "DRESS S"
    DRESS_M = "DRESS M"
    DRESS_L = "DRESS L"
    DRESS_XL = "DRESS XL"
    DRESS_XXL = "DRESS XXL"

    # Size giày
    US_5 = "US 5"
    US_6 = "US 6"
    US_7 = "US 7"
    US_8 = "US 8"
    US_9 = "US 9"
    US_10 = "US 10"
    US_11 = "US 11"
    
    EU_36 = "EU 36"
    EU_37 = "EU 37"
    EU_38 = "EU 38"
    EU_39 = "EU 39"
    EU_40 = "EU 40"
    EU_41 = "EU 41"
    EU_42 = "EU 42"
    
    UK_3 = "UK 3"
    UK_4 = "UK 4"
    UK_5 = "UK 5"
    UK_6 = "UK 6"
    UK_7 = "UK 7"
    UK_8 = "UK 8"
    UK_9 = "UK 9"

    @classmethod
    def choices(cls):
        return [(size.value, size.name) for size in cls]