# 파운데이션 / Typography

출처: https://tossmini-docs.toss.im/tds-mobile/foundation/typography/

Typography

### Typography

Typography는 디자인 시스템의 핵심 요소로, 텍스트의 가독성을 보장하고 일관된 방향성을 유지하며 브랜드 아이덴티티를 전달하는 중요한 역할을 해요. 폰트 크기, 라인 높이 등을 통해 정보의 계층 구조를 명확히 하고, 다양한 디바이스와 환경에서 통일된 비주얼을 제공하는 데 초점을 맞춰요.

우리의 디자인 시스템은 다양한 플랫폼에서의 일관된 사용자 경험을 제공하기 위해 설계되었어요. 안드로이드와 iOS뿐 아니라, 웹 페이지에서도 이질감 없이 동일한 텍스트 스타일이 적용될 수 있도록 명확한 규칙을 따르고 있어요. 특히 네이티브 환경에서의 더 큰 텍스트 모드와 같은 접근성 옵션을 지원하며, 폰트 크기와 텍스트 스타일이 이에 맞춰 동적으로 조정되도록 설계했어요.

### 규칙 알아보기

### 토큰

Typography 토큰은 계층 구조를 가지고 있어요. 사용 방법은 아래 표에서 확인할 수 있어요. Typography를 **사용하는 입장에서 구체적인 폰트 크기와 라인 높이를 외우거나 직접 계산할 필요는 없어요.** 사용자는 계층화된 토큰을 그대로 사용하도록 추상화되어 있어요.

또한, **아래 표에 나온 값을 직접 하드코딩하지 않길 권장해요.** 이 표는 더 큰 텍스트가 적용되지 않은 기본적인 상황을 가정한 것이며, 값을 직접 하드코딩하면 더 큰 텍스트로 인해 시스템의 폰트 크기가 변경되는 상황에서 유연하게 대응하기 어려울 수 있어요.

Tokenfont SizeLine HeightUsageTypography 13040매우 큰 제목sub Typography 12938sub Typography 22837sub Typography 32736Typography 22635큰 제목sub Typography 42534sub Typography 52433조금 큰 제목sub Typography 62332Typography 32231일반 제목sub Typography 72130Typography 42029작은 제목sub Typography 81928조금 큰 본문sub Typography 91827Typography 51725.5일반 본문sub Typography 101624Typography 61522.5작은 본문sub Typography 111421Typography 71319.5안 읽어도 됨sub Typography 121218sub Typography 131116.5아예 안읽어도 됨

### 더 큰 텍스트

더 큰 텍스트는 iOS와 Android에서 제공하는 접근성 설정으로, 사용자가 텍스트 크기를 조정해 가독성을 높이는 기능이에요. 이 설정은 네이티브 환경뿐 아니라 앱 내부의 웹 페이지에서도 동일하게 적용되어야 해요. 네이티브 설정으로 텍스트 비율이 커진 경우, 웹 페이지 본문 텍스트가 상대적으로 작아 가독성이 떨어질 수 있기 때문이에요.

이런 문제를 방지하려면, 사용자가 기기에서 더 큰 텍스트 모드를 활성화하고 비율을 변경했을 때 적용되는 실제 폰트 크기를 아래 표에 정리했어요. 이 표를 참고하면 네이티브와 웹 간 텍스트 비율 차이를 줄이고 모든 환경에서 일관된 사용자 경험을 제공할 수 있어요. 표에 나온 값을 고정 값으로 하드코딩하지 않는 것이 중요해요. 하드코딩된 값은 더 큰 텍스트 모드에서 유연한 대응을 어렵게 만들 수 있어요.

Android, iOS, 웹 간의 차이로 인해 완벽히 동일한 규칙을 적용하기는 어려워요. 하지만 플랫폼 간 차이를 최소화하기 위해 근사한 값을 기준으로 규칙을 마련했어요. 아래에서 이를 확인할 수 있어요.

#### iOS

iOS는 xLarge와, xxLarge와, xxxLarge와와 같이 제한된 수의 더 큰 텍스트 단계를 제공해요. 우리는 이 단계를 비율로 추상화해서 Android, iOS, 그리고 웹 간의 규칙을 일관되게 맞췄어요. 아래 표에서는 네이티브 환경의 각 설정에 따라 웹에서 보여줘야 할 값을 확인할 수 있어요.

비율Typography100%Large110%xLarge120%xxLarge135%xxxLarge160%A11y_Medium190%A11y_Large235%A11y_xLarge275%A11y_xxLarge310%A11y_xxxLargeTypography 1303234364041414242sub Typography 1293133353940414242sub Typography 2283032343839404141sub Typography 3272931333738404141Typography 2262830323638404141sub Typography 4252729313638404141sub Typography 5242628303537394040sub Typography 6232527293437394040Typography 3222426283336394040sub Typography 7212325273236394040Typography 4202224263135383940sub Typography 8192123253034383940sub Typography 9182022242833373839Typography 5171921232732363839sub Typography 10161820222630343739Typography 6151719212428313437sub Typography 11141618202326293236Typography 7131517192124273034sub Typography 12121416182022252832sub Typography 13111315171921242731

#### Android

한편, Android는 iOS와 달리 100% 이상의 모든 값을 지원하고 제한된 단계로 표현할 수 없어요. 그래서 다음 표와 같은 규칙을 마련했어요. 표에 표시된 NN%는 비율을 나타내요.

예를 들어 사용자가 110%로 설정하고 Typography 1 토큰을 사용했다면, 해당 토큰의 공식(`30 x NN x 0.01`)에 따라 33으로 계산돼요.

Typography100%NN%MaxTypography 13030 _ NN _ 0.0142sub Typography 12929 _ NN _ 0.0142sub Typography 22828 _ NN _ 0.0141sub Typography 32727 _ NN _ 0.0141Typography 22626 _ NN _ 0.0141sub Typography 42525 _ NN _ 0.0141sub Typography 52424 _ NN _ 0.0140sub Typography 62323 _ NN _ 0.0140Typography 32222 _ NN _ 0.0140sub Typography 72121 _ NN _ 0.0140Typography 42020 _ NN _ 0.0140sub Typography 81919 _ NN _ 0.0140sub Typography 91818 _ NN _ 0.0139Typography 51717 _ NN _ 0.0139sub Typography 101616 _ NN _ 0.0139Typography 61515 _ NN _ 0.0137sub Typography 111414 _ NN _ 0.0136Typography 71313 _ NN _ 0.0134sub Typography 121212 _ NN _ 0.0132sub Typography 131111 _ NN _ 0.0131

### 전체 보기

Typography_LightTypography1_LightsubTypography1_LightsubTypography2_LightsubTypography3_LightTypography2_LightsubTypography4_LightsubTypography5_LightsubTypography6_LightTypography3_LightsubTypography7_LightTypography4_LightsubTypography8_LightsubTypography9_LightTypography5_LightsubTypography10_LightTypography6_LightsubTypography11_LightTypography7_LightsubTypography12_LightsubTypography13_LightTypography_RegularTypography1_RegularsubTypography1_RegularsubTypography2_RegularsubTypography3_RegularTypography2_RegularsubTypography4_RegularsubTypography5_RegularsubTypography6_RegularTypography3_RegularsubTypography7_RegularTypography4_RegularsubTypography8_RegularsubTypography9_RegularTypography5_RegularsubTypography10_RegularTypography6_RegularsubTypography11_RegularTypography7_RegularsubTypography12_RegularsubTypography13_RegularTypography_MediumTypography1_MediumsubTypography1_MediumsubTypography2_MediumsubTypography3_MediumTypography2_MediumsubTypography4_MediumsubTypography5_MediumsubTypography6_MediumTypography3_MediumsubTypography7_MediumTypography4_MediumsubTypography8_MediumsubTypography9_MediumTypography5_MediumsubTypography10_MediumTypography6_MediumsubTypography11_MediumTypography7_MediumsubTypography12_MediumsubTypography13_MediumTypography_SemiboldTypography1_SemiboldsubTypography1_SemiboldsubTypography2_SemiboldsubTypography3_SemiboldTypography2_SemiboldsubTypography4_SemiboldsubTypography5_SemiboldsubTypography6_SemiboldTypography3_SemiboldsubTypography7_SemiboldTypography4_SemiboldsubTypography8_SemiboldsubTypography9_SemiboldTypography5_SemiboldsubTypography10_SemiboldTypography6_SemiboldsubTypography11_SemiboldTypography7_SemiboldsubTypography12_SemiboldsubTypography13_SemiboldTypography_BoldTypography1_BoldsubTypography1_BoldsubTypography2_BoldsubTypography3_BoldTypography2_BoldsubTypography4_BoldsubTypography5_BoldsubTypography6_BoldTypography3_BoldsubTypography7_BoldTypography4_BoldsubTypography8_BoldsubTypography9_BoldTypography5_BoldsubTypography10_BoldTypography6_BoldsubTypography11_BoldTypography7_BoldsubTypography12_BoldsubTypography13_Bold
