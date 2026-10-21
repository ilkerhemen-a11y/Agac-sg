import React, { useEffect, useMemo, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Question = { question: string; options: string[]; answer: number; explanation: string };

const questions: Question[] = [
  { question: 'Aşağıdakilerden hangisi çalışma hayatını düzenleyen temel kanunlardan biri değildir?', options: ['4857 sayılı İş Kanunu', '5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu', '6331 sayılı İş Sağlığı ve Güvenliği Kanunu', '5237 sayılı Türk Ceza Kanunu'], answer: 3, explanation: '5237 sayılı Türk Ceza Kanunu ceza hukukunu düzenler; diğerleri çalışma hayatı ve sosyal güvenlikle doğrudan ilgilidir.' },
  { question: '4857 sayılı İş Kanunu temel olarak neyi düzenler?', options: ['Vergi işlemlerini', 'İşçi ve işveren arasındaki çalışma ilişkisini', 'Trafik kurallarını', 'Çevre düzenlemelerini'], answer: 1, explanation: '4857 sayılı İş Kanunu, işçi ve işveren arasındaki çalışma ilişkilerinin temel kurallarını düzenler.' },
  { question: '5510 sayılı Kanun aşağıdakilerden hangisiyle ilgilidir?', options: ['Sosyal sigortalar ve genel sağlık sigortası', 'İşyerlerinin yangın yönetimi', 'Trafik güvenliği', 'İş sözleşmelerinin feshi'], answer: 0, explanation: '5510 sayılı Kanun sosyal sigortalar ve genel sağlık sigortası konularını düzenler.' },
  { question: '6331 sayılı İş Sağlığı ve Güvenliği Kanunu’nun temel amacı nedir?', options: ['Çalışma saatlerini belirlemek', 'İşyerlerinde iş sağlığı ve güvenliğini sağlamak ve şartları iyileştirmek', 'Çalışanların maaşlarını belirlemek', 'Vergi oranlarını düzenlemek'], answer: 1, explanation: 'Kanunun amacı, işyerlerinde iş sağlığı ve güvenliğini sağlamak ve mevcut sağlık ve güvenlik şartlarını iyileştirmektir.' },
  { question: 'Aşağıdakilerden hangisi 6331 sayılı İş Sağlığı ve Güvenliği Kanunu kapsamında yer alır?', options: ['Sadece özel sektör çalışanları', 'Sadece kamu çalışanları', 'Çırak ve stajyerler de dahil olmak üzere çalışanlar', 'Sadece işverenler'], answer: 2, explanation: 'Kanun, istisnalar saklı kalmak üzere kamu ve özel sektördeki işyerlerini ve çalışanları kapsar; çıraklar ve stajyerler de kapsamdadır.' },
  { question: 'İş Sağlığı ve Güvenliği açısından “proaktif yaklaşım” hangisini ifade eder?', options: ['Kaza meydana geldikten sonra önlem almak', 'Tehlike ve riskleri önceden öngörerek önlem almak', 'Sadece kaza sonrası rapor hazırlamak', 'Riskleri göz ardı etmek'], answer: 1, explanation: 'Proaktif yaklaşım, kaza yaşanmadan önce tehlikeleri belirlemeyi ve riskleri azaltacak önlemleri almayı esas alır.' },
  { question: 'İşverenin aşağıdakilerden hangisini yapması 6331 sayılı İş Sağlığı ve Güvenliği Kanunu kapsamında bir sorumluluktur?', options: ['Risk değerlendirmesi yapmak veya yaptırmak', 'Çalışanların kişisel eşyalarını denetlemek', 'Çalışanların özel hayatını takip etmek', 'Çalışanların izinlerini kaldırmak'], answer: 0, explanation: 'İşveren, iş sağlığı ve güvenliği yönünden risk değerlendirmesi yapmak veya yaptırmakla yükümlüdür.' },
  { question: 'Çalışan, işyerinde ciddi ve yakın bir tehlike ile karşılaştığında ne yapmalıdır?', options: ['Tehlikeyi görmezden gelmelidir.', 'İşverene veya çalışan temsilcisine derhal haber vermelidir.', 'İşyerini izinsiz terk etmelidir.', 'Tehlikeli bölgeye müdahale etmelidir.'], answer: 1, explanation: 'Çalışan, ciddi ve yakın tehlikeyi işverene veya çalışan temsilcisine bildirmelidir; mevzuattaki ciddi ve yakın tehlike hükümleri de dikkate alınmalıdır.' },
  { question: 'Aşağıdakilerden hangisi çalışanın sorumluluklarından biridir?', options: ['Kişisel koruyucu donanımı doğru kullanmak', 'Güvenlik donanımlarını keyfi olarak değiştirmek', 'Tehlikeleri gizlemek', 'İş güvenliği talimatlarına uymamak'], answer: 0, explanation: 'Çalışan, kendisine sağlanan kişisel koruyucu donanımları ve güvenlik araçlarını doğru kullanmalı, talimatlara uymalıdır.' },
  { question: 'Çok tehlikeli sınıfta bulunan işyerlerinde İş Sağlığı ve Güvenliği Kurulu normal şartlarda en az ne sıklıkla toplanır?', options: ['Haftada bir', '15 günde bir', 'Ayda en az bir kez', 'Yılda bir'], answer: 2, explanation: 'Genel kural olarak kurul ayda en az bir kez toplanır. Mevzuattaki şartlar çerçevesinde toplantı aralığı farklılaştırılabilir.' },
];


const cleaningQuestions: Question[] = [
  { question: 'İş yerinin temiz ve düzenli tutulmasının faydalarından biri aşağıdakilerden hangisidir?', options: ['İş kazalarını artırmak', 'Verimliliği artırmak', 'Çalışma süresini uzatmak', 'Dağınıklığı artırmak'], answer: 1, explanation: 'Temiz ve düzenli çalışma alanı verimliliği destekler, tehlikeleri azaltmaya yardımcı olur.' },
  { question: "5S yönteminin temel amacı nedir?", options: ['Çalışma ortamını daha güvenli ve düzenli hale getirmek', 'Çalışan sayısını azaltmak', 'Üretimi durdurmak', 'Malzeme kullanımını artırmak'], answer: 0, explanation: '5S, çalışma alanını düzenli, temiz, verimli ve güvenli hale getirmeyi amaçlar.' },
  { question: "5S'in ilk adımı olan Ayıklama-Sınıflandırma (Seiri) neyi ifade eder?", options: ['Temizlik yapmak', 'Gereksiz malzemeleri ayırmak', 'Çalışanları eğitmek', 'Malzemeleri etiketlemek'], answer: 1, explanation: 'Seiri aşamasında gerekli ve gereksiz malzemeler ayrılır; gereksiz olanlar çalışma alanından uzaklaştırılır.' },
  { question: 'Gereksiz malzemelerin belirlenmesinde kullanılan yöntemlerden biri hangisidir?', options: ['Mavi Etiket', 'Yeşil Etiket', 'Kırmızı Etiket', 'Sarı Etiket'], answer: 2, explanation: '5S uygulamalarında kırmızı etiket, gereksiz veya durumu değerlendirilmesi gereken malzemeleri belirlemek için kullanılabilir.' },
  { question: "5S'te Düzenleme (Seiton) aşamasının amacı nedir?", options: ['Gerekli malzemelerin kolay bulunmasını sağlamak', 'Gereksiz malzemeleri artırmak', 'Çalışma alanını kirletmek', 'Malzemeleri rastgele yerleştirmek'], answer: 0, explanation: 'Seiton, gerekli araç ve malzemelerin belirli yerlerde düzenli tutulmasını ve kolay bulunmasını sağlar.' },
  { question: 'Yağ veya su gibi kayganlaştırıcı maddeler çalışma alanına döküldüğünde ne yapılmalıdır?', options: ['Beklenmelidir', 'Üzerine başka malzeme konulmalıdır', 'Hemen temizlenmelidir', 'Görmezden gelinmelidir'], answer: 2, explanation: 'Kayma ve düşme riskini azaltmak için döküntü güvenli şekilde ve gecikmeden temizlenmeli, gerekiyorsa alan uyarı işaretleriyle çevrilmelidir.' },
  { question: 'Acil çıkış yolları ve kapıları nasıl tutulmalıdır?', options: ['Malzemelerle doldurulmalıdır', 'Sürekli kullanılabilir durumda tutulmalıdır', 'Kilitli tutulmalıdır', 'Depolama alanı olarak kullanılmalıdır'], answer: 1, explanation: 'Acil çıkışlar ve geçiş yolları engellenmemeli, ihtiyaç anında kullanılabilir durumda tutulmalıdır.' },
  { question: 'Elektrik kablolarının geçiş yollarında dağınık bırakılması hangi riske yol açabilir?', options: ['Takılıp düşme', 'Verimlilik artışı', 'Daha hızlı çalışma', 'Gürültünün azalması'], answer: 0, explanation: 'Geçiş yollarındaki dağınık kablolar takılma ve düşmeye; ayrıca kablo hasarı gibi başka risklere neden olabilir.' },
  { question: 'İş kıyafetleri ile özel kıyafetlerin ayrı dolaplarda tutulmasının amacı nedir?', options: ['Dolap sayısını azaltmak', 'Kıyafetlerin daha hızlı eskimesini sağlamak', 'Kirli iş kıyafetlerinin özel kıyafetlere temasını önlemek', 'Çalışma alanını daraltmak'], answer: 2, explanation: 'Ayrı muhafaza, iş kıyafetlerindeki kir ve zararlı maddelerin özel kıyafetlere bulaşma riskini azaltır.' },
  { question: 'Aşağıdakilerden hangisi kişisel hijyen açısından doğrudur?', options: ['İş sonrası eller yıkanmamalıdır', 'Tehlikeli maddelerle çalışılan yerde yemek yenmelidir', 'Çalışma sonrası eller yıkanmalıdır', 'Tiner cilt temizliğinde kullanılabilir'], answer: 2, explanation: 'Çalışma sonrası eller uygun şekilde yıkanmalıdır. Tiner gibi çözücüler cilt temizliğinde kullanılmamalıdır.' },
];


const accidentQuestions: Question[] = [
  { question: '5510 sayılı Kanun bakımından bir olayın iş kazası sayılmasında aşağıdakilerden hangisi tek başına yeterli değildir?', options: ['Sigortalının işyerinde bulunduğu sırada meydana gelmesi', 'İşverenin yürüttüğü iş nedeniyle meydana gelmesi', 'İşverenin sağladığı taşıtla işe gidiş-geliş sırasında meydana gelmesi', 'Yalnızca maddi zarara yol açması'], answer: 3, explanation: 'İş kazası değerlendirmesinde kanundaki koşullar ve olayın niteliği dikkate alınır; yalnızca maddi zarar oluşması tek başına iş kazası tanımını karşılamaz.' },
  { question: '6331 sayılı Kanun’a göre iş kazası nedir?', options: ['Sadece işyerindeki maddi hasarlar', 'İşyerinde veya işin yürütümü nedeniyle meydana gelen; ölüme yol açan ya da vücut bütünlüğünü ruhen veya bedenen engelli hâle getiren olay', 'Sadece işe gidiş geliş kazaları', 'Sadece ölümle sonuçlanan olaylar'], answer: 1, explanation: '6331 sayılı Kanun’daki tanım, işyerinde veya işin yürütümü nedeniyle meydana gelen ve ölüm ya da bedensel/ruhsal bütünlükte engellilik sonucu doğuran olayları kapsar.' },
  { question: 'Meslek hastalığı aşağıdakilerden hangisiyle ilişkilidir?', options: ['İşin niteliği veya yürütüm şartları', 'Çalışanın hobileri', 'Çalışanın tatili', 'İş dışındaki sosyal faaliyetler'], answer: 0, explanation: 'Meslek hastalığı, yapılan işin niteliğinden veya işin yürütüm şartlarından kaynaklanan hastalıktır.' },
  { question: 'İşveren, öğrendiği meslek hastalığını SGK’ya en geç kaç iş günü içinde bildirmelidir?', options: ['1 gün', '2 gün', '3 gün', '5 gün'], answer: 2, explanation: '5510 sayılı Kanun kapsamında işveren, kendisine bildirilen veya öğrendiği meslek hastalığını öğrenme tarihinden itibaren üç iş günü içinde SGK’ya bildirmelidir.' },
  { question: 'İşveren tarafından sağlanan servis aracında meydana gelen kaza hangi durumda iş kazası sayılabilir?', options: ['Çalışanın kendi özel aracıyla giderken', 'İşverenin sağladığı taşıtla işe gidiş-geliş sırasında', 'Tatildeyken', 'İşten ayrıldıktan sonra'], answer: 1, explanation: 'Sigortalının işverence sağlanan taşıtla işin yapıldığı yere gidiş gelişi sırasında meydana gelen olay, kanundaki şartlarla iş kazası sayılabilir.' },
  { question: 'Sürekli iş göremezlik geliri bağlanabilmesi için meslekte kazanma gücünün en az ne kadar azalması gerekir?', options: ['%5', '%10', '%25', '%50'], answer: 1, explanation: 'Sürekli iş göremezlik geliri için meslekte kazanma gücünün en az yüzde 10 azalmış olması gerekir.' },
  { question: 'İş kazası veya meslek hastalığı sonucunda acı, keder ve üzüntü oluşması durumunda hangi tazminat talep edilebilir?', options: ['Maddi tazminat', 'Manevi tazminat', 'İdari para cezası', 'Cenaze ödeneği'], answer: 1, explanation: 'Koşulları oluştuğunda, yaşanan elem ve üzüntü nedeniyle manevi tazminat talep edilebilir.' },
  { question: 'İşverenin İSG yükümlülüklerini ihlal etmesi ve bu ihlalin zarara yol açması hâlinde, somut olayın şartlarına göre aşağıdakilerden hangileri gündeme gelebilir?', options: ['İdari yaptırım', 'Tazminat sorumluluğu', 'SGK’nın rücu talebi', 'Hepsi'], answer: 3, explanation: 'Olayın şartlarına ve yasal koşullara bağlı olarak idari yaptırım, tazminat sorumluluğu ve SGK’nın rücu talebi gündeme gelebilir.' },
  { question: 'Taksir nedir?', options: ['Suçun kasıtlı olarak işlenmesi', 'Dikkat ve özen yükümlülüğüne aykırı davranılması sonucu neticenin öngörülmeden gerçekleşmesi', 'İşçinin izin kullanması', 'İşverenin yazılı talimat vermesi'], answer: 1, explanation: 'Taksir, dikkat ve özen yükümlülüğüne aykırılık nedeniyle kanuni tanımdaki sonucun meydana gelmesidir. Sonucun öngörüldüğü hâlde istenmemesi bilinçli taksir kapsamında değerlendirilebilir.' },
  { question: 'İş kazası veya meslek hastalığı sonucu sigortalının ölmesi durumunda hak sahiplerine ne bağlanabilir?', options: ['Ölüm geliri', 'Yalnızca maaş', 'Sadece izin', 'Hiçbir ödeme yapılmaz'], answer: 0, explanation: 'Yasal koşulların oluşması hâlinde sigortalının hak sahiplerine ölüm geliri bağlanabilir.' },
];

const categories = [
  { title: 'Temel İSG', subtitle: 'İş sağlığı ve güvenliğine giriş', icon: '🦺', count: '10 soru' },
  { title: 'Ekstra Cevaplar', subtitle: 'Ek soru-cevap ve kısa konu notları', icon: '📚', count: 'İçerik eklenecek' },
  { title: 'İşyeri Temizliği ve Düzeni', subtitle: '5S, hijyen ve çalışma alanı düzeni', icon: '🧹', count: '10 soru' },
  { title: 'İş Kazası ve Meslek Hastalığı', subtitle: 'Hukuki sonuçlar ve sosyal güvenlik', icon: '⚖️', count: '10 soru' },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  useEffect(() => { Alert.alert('Bildiri', 'Lütfen soru ve cevapları kontrol ederek işleminize devam edin.'); }, []);
  const filtered = useMemo(() => categories.filter(c => (c.title + ' ' + c.subtitle).toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR'))), [search]);
  const isQuizCategory = selected === 'Temel İSG' || selected === 'İşyeri Temizliği ve Düzeni' || selected === 'İş Kazası ve Meslek Hastalığı';
  const activeQuestions = selected === 'İşyeri Temizliği ve Düzeni' ? cleaningQuestions : selected === 'İş Kazası ve Meslek Hastalığı' ? accidentQuestions : questions;
  const score = activeQuestions.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0B3D2E" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <View style={styles.brandRow}>
            <View style={styles.logo}><Text style={styles.logoText}>A</Text></View>
            <View><Text style={styles.brand}>AgaçİSG</Text><Text style={styles.tagline}>Güvenli çalışma, güçlü gelecek.</Text></View>
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>İŞ SAĞLIĞI VE GÜVENLİĞİ</Text>
            <Text style={styles.headline}>Bilgini geliştir.{ '\n' }Güvenle çalış.</Text>
            <Text style={styles.heroSub}>İSG konularını keşfet, sorularla öğrenmeye hazırlan.</Text>
          </View>
          <View style={styles.statCard}>
            <View><Text style={styles.statNumber}>{categories.length}</Text><Text style={styles.statLabel}>Konu başlığı</Text></View>
            <View style={styles.statDivider} />
            <View><Text style={styles.statNumber}>{Object.keys(answers).length}</Text><Text style={styles.statLabel}>Yanıtlanan soru</Text></View>
            <View style={styles.statDivider} />
            <View><Text style={styles.statNumber}>✓</Text><Text style={styles.statLabel}>Güvenlik odağı</Text></View>
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <View><Text style={styles.sectionTitle}>{isQuizCategory ? selected : selected === 'Ekstra Cevaplar' ? 'Ekstra Cevaplar' : 'Kategoriler'}</Text><Text style={styles.sectionSub}>{selected === 'Temel İSG' ? 'Çalışma mevzuatı bilgilerini test et' : selected === 'İşyeri Temizliği ve Düzeni' ? 'Temizlik, 5S ve hijyen bilgilerini test et' : selected === 'İş Kazası ve Meslek Hastalığı' ? 'İş kazası, meslek hastalığı ve hukuki sonuçları öğren' : selected === 'Ekstra Cevaplar' ? 'Başlıklar altında yalnızca cevaplar' : 'Öğrenmek istediğin konuyu seç'}</Text></View>
          {isQuizCategory ? <TouchableOpacity onPress={() => setSelected(null)}><Text style={styles.backButton}>← Kategoriler</Text></TouchableOpacity> : <Text style={styles.sectionCount}>{filtered.length} konu</Text>}
        </View>
        {!selected && <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput value={search} onChangeText={setSearch} placeholder="Kategori ara..." placeholderTextColor="#819087" style={styles.searchInput} /></View>}
        {!selected && filtered.map((item) => (
          <TouchableOpacity key={item.title} activeOpacity={0.8} style={styles.category} onPress={() => setSelected(item.title)}>
            <View style={styles.categoryIcon}><Text style={styles.categoryEmoji}>{item.icon}</Text></View>
            <View style={styles.categoryInfo}><Text style={styles.categoryTitle}>{item.title}</Text><Text style={styles.categorySubtitle}>{item.subtitle}</Text><Text style={styles.categoryCount}>{item.count}</Text></View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
        {isQuizCategory && <View style={styles.quiz}>
          <View style={styles.quizHeader}><Text style={styles.quizTitle}>{selected === 'Temel İSG' ? 'Çalışma Mevzuatı İle İlgili Bilgiler-2026' : selected === 'İşyeri Temizliği ve Düzeni' ? 'İşyeri Temizliği ve Düzeni-2026' : 'İş Kazası ve Meslek Hastalığından Doğan Hukuki Sonuçlar-2026'}</Text><Text style={styles.quizProgress}>{Object.keys(answers).length}/{activeQuestions.length} yanıtlandı  •  Doğru: {score}</Text></View>
          {activeQuestions.map((q, index) => {
            const chosen = answers[index];
            return <View key={index} style={styles.questionCard}>
              <Text style={styles.questionNumber}>{index + 1}. SORU</Text>
              <Text style={styles.questionText}>{q.question}</Text>
              {q.options.map((option, optionIndex) => {
                const isChosen = chosen === optionIndex;
                const isCorrect = q.answer === optionIndex;
                const showResult = chosen !== undefined;
                return <TouchableOpacity key={optionIndex} activeOpacity={0.8} onPress={() => setAnswers(prev => ({ ...prev, [index]: optionIndex }))} style={[styles.option, showResult && isCorrect && styles.optionCorrect, showResult && isChosen && !isCorrect && styles.optionWrong]}>
                  <Text style={[styles.optionLetter, showResult && isCorrect && styles.optionLetterCorrect]}>{String.fromCharCode(65 + optionIndex)}</Text>
                  <Text style={[styles.optionText, showResult && isCorrect && styles.optionTextCorrect]}>{option}</Text>
                </TouchableOpacity>;
              })}
              {chosen !== undefined && <View style={styles.explanation}><Text style={styles.explanationTitle}>{chosen === q.answer ? '✓ Doğru cevap' : 'Doğru cevap: ' + String.fromCharCode(65 + q.answer)}</Text><Text style={styles.explanationText}>{q.explanation}</Text></View>}
            </View>;
          })}
          <TouchableOpacity style={styles.resetButton} onPress={() => setAnswers({})}><Text style={styles.resetButtonText}>Yanıtları sıfırla ve yeniden başla</Text></TouchableOpacity>
        </View>}
        {selected === 'Ekstra Cevaplar' && <View style={styles.extraAnswers}>{cleaningQuestions.map((q, index) => <View key={index} style={styles.answerItem}><Text style={styles.answerHeading}>{q.question}</Text><Text style={styles.answerOnly}>{q.options[q.answer]}</Text></View>)}<TouchableOpacity onPress={() => setSelected(null)}><Text style={styles.backLink}>← Kategorilere dön</Text></TouchableOpacity></View>}
        {filtered.length === 0 && !selected && <Text style={styles.empty}>Bu aramayla eşleşen kategori bulunamadı.</Text>}
        <Text style={styles.footer}>AgaçİSG • Öğren, önle, güvenle çalış.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#F4F7F4'}, content:{paddingBottom:28},
  hero:{backgroundColor:'#0B3D2E',paddingHorizontal:22,paddingTop:20,paddingBottom:34,borderBottomLeftRadius:28,borderBottomRightRadius:28},
  brandRow:{flexDirection:'row',alignItems:'center',gap:12},logo:{width:48,height:48,borderRadius:16,backgroundColor:'#F5A623',alignItems:'center',justifyContent:'center'},logoText:{fontSize:27,fontWeight:'900',color:'#0B3D2E'},brand:{fontSize:23,fontWeight:'800',color:'#FFFFFF',letterSpacing:0.2},tagline:{fontSize:12,color:'#C8DDD2',marginTop:2},
  heroCopy:{marginTop:30},eyebrow:{fontSize:10,fontWeight:'800',letterSpacing:1.7,color:'#F5B544'},headline:{fontSize:31,lineHeight:37,fontWeight:'900',color:'#FFFFFF',marginTop:9},heroSub:{fontSize:13,lineHeight:20,color:'#D3E4DB',marginTop:10,maxWidth:285},
  statCard:{flexDirection:'row',alignItems:'center',justifyContent:'space-around',backgroundColor:'#FFFFFF',borderRadius:18,paddingVertical:15,marginTop:24},statNumber:{fontSize:21,fontWeight:'900',color:'#0B3D2E',textAlign:'center'},statLabel:{fontSize:9,color:'#68786F',marginTop:4,textAlign:'center'},statDivider:{width:1,height:32,backgroundColor:'#E5ECE7'},
  sectionHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:20,marginTop:25,marginBottom:13},sectionTitle:{fontSize:21,fontWeight:'800',color:'#18382B'},sectionSub:{fontSize:12,color:'#75847B',marginTop:4},sectionCount:{fontSize:11,fontWeight:'700',color:'#28734F',backgroundColor:'#E1F1E6',paddingHorizontal:10,paddingVertical:7,borderRadius:20},backButton:{fontSize:12,fontWeight:'800',color:'#28734F',padding:8},
  searchBox:{marginHorizontal:20,marginBottom:14,flexDirection:'row',alignItems:'center',backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#E4EBE5',borderRadius:14,paddingHorizontal:14,height:48},searchIcon:{fontSize:25,color:'#668073',marginRight:8},searchInput:{flex:1,fontSize:14,color:'#19382B'},
  category:{flexDirection:'row',alignItems:'center',marginHorizontal:20,marginBottom:10,padding:13,backgroundColor:'#FFFFFF',borderRadius:17,borderWidth:1,borderColor:'#E7EDE8'},categoryIcon:{width:49,height:49,borderRadius:15,backgroundColor:'#EAF4ED',alignItems:'center',justifyContent:'center'},categoryEmoji:{fontSize:23},categoryInfo:{flex:1,marginLeft:13},categoryTitle:{fontSize:14,fontWeight:'800',color:'#19382B'},categorySubtitle:{fontSize:11,color:'#75847B',marginTop:4},categoryCount:{fontSize:10,color:'#3D815D',fontWeight:'700',marginTop:7},chevron:{fontSize:27,color:'#71907D',paddingHorizontal:5},
  quiz:{marginHorizontal:16},quizHeader:{padding:17,backgroundColor:'#E1F1E6',borderRadius:17,marginBottom:12},quizTitle:{fontSize:17,lineHeight:23,fontWeight:'900',color:'#18382B'},quizProgress:{fontSize:11,color:'#28734F',fontWeight:'700',marginTop:8},
  questionCard:{padding:15,backgroundColor:'#FFFFFF',borderRadius:17,borderWidth:1,borderColor:'#E3EBE5',marginBottom:12},questionNumber:{fontSize:10,letterSpacing:1,fontWeight:'900',color:'#3D815D',marginBottom:8},questionText:{fontSize:15,lineHeight:22,fontWeight:'800',color:'#19382B',marginBottom:12},option:{flexDirection:'row',alignItems:'center',padding:11,borderRadius:12,borderWidth:1,borderColor:'#E5EBE6',marginBottom:8,backgroundColor:'#FBFCFB'},optionCorrect:{borderColor:'#27945D',backgroundColor:'#E7F7EC'},optionWrong:{borderColor:'#D85B55',backgroundColor:'#FFF0EF'},optionLetter:{width:26,height:26,borderRadius:9,overflow:'hidden',textAlign:'center',textAlignVertical:'center',fontSize:12,fontWeight:'900',color:'#466252',backgroundColor:'#EAF1EC',marginRight:10,paddingTop:4},optionLetterCorrect:{backgroundColor:'#27945D',color:'#FFFFFF'},optionText:{flex:1,fontSize:12,lineHeight:18,color:'#31473A'},optionTextCorrect:{fontWeight:'700',color:'#1B6C3D'},explanation:{backgroundColor:'#F2F7F3',padding:11,borderRadius:11,marginTop:2},explanationTitle:{fontSize:12,fontWeight:'900',color:'#216C43'},explanationText:{fontSize:11,lineHeight:17,color:'#4D6656',marginTop:4},resetButton:{backgroundColor:'#0B3D2E',borderRadius:14,padding:15,alignItems:'center',marginVertical:5},resetButtonText:{fontSize:13,fontWeight:'800',color:'#FFFFFF'},
  extraAnswers:{marginHorizontal:20,marginTop:3,marginBottom:10},answerItem:{padding:15,backgroundColor:'#FFFFFF',borderRadius:14,borderWidth:1,borderColor:'#E3EBE5',marginBottom:10},answerHeading:{fontSize:13,lineHeight:19,fontWeight:'800',color:'#19382B'},answerOnly:{fontSize:13,lineHeight:19,color:'#28734F',fontWeight:'700',marginTop:8},backLink:{fontSize:12,fontWeight:'800',color:'#28734F',marginTop:12},empty:{textAlign:'center',color:'#75847B',padding:24},footer:{textAlign:'center',fontSize:11,color:'#829087',marginTop:16}
});
