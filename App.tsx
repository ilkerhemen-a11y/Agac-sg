import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const categories = [
  { title: 'Temel İSG', subtitle: 'İş sağlığı ve güvenliğine giriş', icon: '🦺', count: 'Sorular eklenecek' },
  { title: 'Kişisel Koruyucu Donanım', subtitle: 'KKD kullanımı ve kontrolleri', icon: '⛑️', count: 'Sorular eklenecek' },
  { title: 'Acil Durumlar', subtitle: 'Yangın, tahliye ve ilk adımlar', icon: '🚨', count: 'Sorular eklenecek' },
  { title: 'İş Ekipmanları', subtitle: 'Güvenli kullanım ve kontroller', icon: '🛠️', count: 'Sorular eklenecek' },
  { title: 'Çalışma Alanı Güvenliği', subtitle: 'Saha düzeni ve risklerin önlenmesi', icon: '🏗️', count: 'Sorular eklenecek' },
  { title: 'Uyarı İşaretleri', subtitle: 'İşaretler, renkler ve anlamları', icon: '⚠️', count: 'Sorular eklenecek' },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = useMemo(() => categories.filter(c => (c.title + ' ' + c.subtitle).toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR'))), [search]);

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
            <View><Text style={styles.statNumber}>0</Text><Text style={styles.statLabel}>Tamamlanan soru</Text></View>
            <View style={styles.statDivider} />
            <View><Text style={styles.statNumber}>✓</Text><Text style={styles.statLabel}>Güvenlik odağı</Text></View>
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <View><Text style={styles.sectionTitle}>Kategoriler</Text><Text style={styles.sectionSub}>Öğrenmek istediğin konuyu seç</Text></View>
          <Text style={styles.sectionCount}>{filtered.length} konu</Text>
        </View>
        <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput value={search} onChangeText={setSearch} placeholder="Kategori ara..." placeholderTextColor="#819087" style={styles.searchInput} /></View>
        {filtered.map((item) => (
          <TouchableOpacity key={item.title} activeOpacity={0.8} style={[styles.category, selected === item.title && styles.categorySelected]} onPress={() => setSelected(selected === item.title ? null : item.title)}>
            <View style={styles.categoryIcon}><Text style={styles.categoryEmoji}>{item.icon}</Text></View>
            <View style={styles.categoryInfo}><Text style={styles.categoryTitle}>{item.title}</Text><Text style={styles.categorySubtitle}>{item.subtitle}</Text><Text style={styles.categoryCount}>{item.count}</Text></View>
            <Text style={styles.chevron}>{selected === item.title ? '⌄' : '›'}</Text>
          </TouchableOpacity>
        ))}
        {selected && <View style={styles.notice}><Text style={styles.noticeTitle}>{selected}</Text><Text style={styles.noticeText}>Bu kategorinin soru ve cevaplarını sen gönderdikçe buraya ekleyeceğiz. İlk sürüm tasarım aşamasındadır.</Text></View>}
        {filtered.length === 0 && <Text style={styles.empty}>Bu aramayla eşleşen kategori bulunamadı.</Text>}
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
  sectionHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:20,marginTop:25,marginBottom:13},sectionTitle:{fontSize:21,fontWeight:'800',color:'#18382B'},sectionSub:{fontSize:12,color:'#75847B',marginTop:4},sectionCount:{fontSize:11,fontWeight:'700',color:'#28734F',backgroundColor:'#E1F1E6',paddingHorizontal:10,paddingVertical:7,borderRadius:20},
  searchBox:{marginHorizontal:20,marginBottom:14,flexDirection:'row',alignItems:'center',backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#E4EBE5',borderRadius:14,paddingHorizontal:14,height:48},searchIcon:{fontSize:25,color:'#668073',marginRight:8},searchInput:{flex:1,fontSize:14,color:'#19382B'},
  category:{flexDirection:'row',alignItems:'center',marginHorizontal:20,marginBottom:10,padding:13,backgroundColor:'#FFFFFF',borderRadius:17,borderWidth:1,borderColor:'#E7EDE8'},categorySelected:{borderColor:'#3C9667',backgroundColor:'#F7FCF8'},categoryIcon:{width:49,height:49,borderRadius:15,backgroundColor:'#EAF4ED',alignItems:'center',justifyContent:'center'},categoryEmoji:{fontSize:23},categoryInfo:{flex:1,marginLeft:13},categoryTitle:{fontSize:14,fontWeight:'800',color:'#19382B'},categorySubtitle:{fontSize:11,color:'#75847B',marginTop:4},categoryCount:{fontSize:10,color:'#3D815D',fontWeight:'700',marginTop:7},chevron:{fontSize:27,color:'#71907D',paddingHorizontal:5},
  notice:{marginHorizontal:20,marginTop:3,marginBottom:10,padding:16,borderRadius:15,backgroundColor:'#FFF4DC',borderWidth:1,borderColor:'#F1D69A'},noticeTitle:{fontWeight:'800',fontSize:14,color:'#6B4A0A'},noticeText:{fontSize:12,lineHeight:18,color:'#765D2D',marginTop:6},empty:{textAlign:'center',color:'#75847B',padding:24},footer:{textAlign:'center',fontSize:11,color:'#829087',marginTop:16}
});
