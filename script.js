/* tiến trình game — đọc sớm để activateTab() chặn nhảy cóc tab chưa mở khoá */
window.__soeProgress = (function(){ try{ return parseInt(localStorage.getItem('soe_game_progress')||'0',10)||0; }catch(e){ return 0; } })();

/* ============ DATA ============ */
var STAGES=[
 {ctx:"Đặt nền tảng — tập trung xây product depth. AM đã cover sensing, SoE phải nắm chắc kỹ thuật để không bị bí trong bất kỳ buổi gặp nào.",
  t:["Setup Work+/Info+/HRM+/Finance+ từ bài toán thực tế trong 24h","Phân biệt khi nào dùng Wework vs Service vs Table","Map requirements đơn giản của KH sang module phù hợp","Ghi Meeting Note đầy đủ sau mỗi buổi CO triển khai"],
  c:["Frame tính năng bằng benefit cụ thể cho end-user","Phân biệt pain bề mặt vs pain thật — nhận biết trước, thấu hiểu sau"],
  s:["Không bị lạnh trong phòng họp khi gặp C-level hoặc D-level","Giao tiếp tự nhiên với admin và end-user của KH"],
  up:["Build product depth qua volume triển khai CO: sau mỗi dự án viết 3 câu — bài toán KH, giải pháp fit, điểm làm tốt hơn. Không để câu hỏi tồn quá 24h.","Bắt đầu nhận biết bài toán: 2 hypothesis trước mỗi buổi CO, check lại sau buổi. Shadow ≥ 2 buổi discovery, chỉ observe."]},
 {ctx:"AM đã có sensing, SoE phải bù product depth. Technician là ưu tiên, Consultant bắt đầu develop. Win rate ~25%, ARPD 100–150tr/deal.",
  t:["Setup multi-module end-to-end trong 24h; import data thực của KH","Xử lý technical objection ngay trong buổi demo — không cần confirm lại team","Build showcase phù hợp bài toán KH trong 4–6h"],
  c:["Chuẩn bị 3 hypothesis về pain point trước mỗi buổi discovery","Frame solution theo business outcome, không theo tên tính năng","Biết khi nào deal không fit — nói thẳng với AM thay vì cố ép"],
  s:["Điều chỉnh tốc độ và độ kỹ thuật tùy đối tượng: Chủ tịch vs Trưởng bộ phận vs nhân viên","Không bị áp lực khi bị hỏi những gì chưa biết — trả lời thành thật"],
  up:["Tăng accuracy hypothesis pain point: viết 3 trước discovery, check lại từng cái. Target ≥ 2/3 đúng sau 3 tháng.","Tập frame bằng ngôn ngữ business: role-play với AM đóng vai KH, mô tả giải pháp mà không được gọi tên tính năng."]},
 {ctx:"Technician đã internalize — brain space chuyển sang consultative thinking. Consultant bắt đầu dẫn dắt. Win rate 25–33%, ARPD 150–300tr/deal.",
  t:["Complex multi-module solution: 4–6 modules với trade-off rõ ràng","Xử lý edge case và integration question không cần escalate lên senior"],
  c:["Whiteboard process map trực tiếp trong meeting — không về nhà vẽ lại","Xác định root cause trước khi đề xuất giải pháp","Đề xuất 2–3 phương án với trade-off; tính ROI / payback period","Propose deal strategy cho AM — không chỉ execute theo yêu cầu"],
  s:["Mở showcase bằng câu chuyện KH tương tự — narrative, không phải facts","Confident hơn khi trình bày với C-level: ngắn, rõ, đúng điểm quan tâm"],
  up:["Develop consultative questioning thật: >60% câu hỏi open-ended, tập im lặng sau câu hỏi — không cứu KH bằng gợi ý ngay.","Học nói chuyện bằng con số: mỗi discovery ghi ≥ 1 con số thực. Sau deal win, phỏng vấn KH ngắn → case study."]},
 {ctx:"Technician thành reflex. Consultant chiếm đa số — đây là differentiator thật. Storyteller tăng vì đối tượng là C-level và D-level. Win rate >33%, ARPD >300tr/deal.",
  t:["Enterprise multi-module architecture; integration với ERP/HRM của KH","Build demo library chuẩn hóa cho cả team SoE"],
  c:["Re-frame bài toán KH theo strategic lens khi ngồi với C-level","Design lộ trình CĐS 3 năm với phased approach — không chỉ sell một deal","Propose deal strategy và pricing cho AM; identify expansion sau close"],
  s:["Command room khi present với board: ngắn, rõ, confident, không jargon","Biến objection thành lý do mua"],
  up:["Develop strategic advisory: sau mỗi deal tự hỏi 'nếu là CEO của KH này, quyết định này ảnh hưởng chiến lược 3 năm thế nào?'","Chọn fork: IC track (deal phức tạp nhất, vertical expertise) hoặc Management track (hiring, onboarding, evaluate người)."]}
];

var CORE=[
 {n:"Customer & Business Acumen",d:[
   {n:"Base Product Ecosystem",desc:"Nắm vững 8 bộ sản phẩm Base và vai trò từng module theo từng bài toán.",l:["Biết chức năng chính; phân biệt Work+, Info+, HRM+, CRM, Goal, Finance+","Tư vấn module phù hợp độc lập; hiểu sâu Work+ và ≥ 2 bộ khác","Master toàn bộ; thiết kế multi-module solution architecture phức tạp"]},
   {n:"Industry & Market Reading",desc:"Nắm đặc thù vận hành và pain điển hình theo từng ngành.",l:["Nhận diện pain bề mặt với gợi ý; biết ngành mục tiêu của Base","Phân tích value chain độc lập; xác định KPI và bottleneck cốt lõi","Tư vấn lộ trình CĐS phù hợp đặc thù ngành và giai đoạn phát triển"]},
   {n:"Commercial Fluency",desc:"Hiểu bài toán tài chính và ROI để thuyết phục bằng con số thực.",l:["Hiểu ROI cơ bản; trình bày bảng chi phí đơn giản với hỗ trợ","Tính payback period và TCO; so sánh cost-benefit nhiều phương án","Xây business case thuyết phục cho C-level; liên kết tính năng với chỉ tiêu tài chính"]},
   {n:"C-levels & D-levels Fluency",desc:"Nói chuyện được với tất cả cấp bậc — từ Chủ tịch HĐQT đến Trưởng bộ phận.",l:["Giao tiếp rõ ràng với D-level; cần hỗ trợ khi làm việc với C-level","Tự tin present với C-level; điều chỉnh message theo mối quan tâm từng cấp","Được tin tưởng như Trusted Advisor ở mọi cấp — từ Chủ tịch đến công nhân"]}
 ]},
 {n:"Discovery & Problem-Framing",d:[
   {n:"Pre-Call Preparation",desc:"Research KH và chuẩn bị hypothesis trước mỗi buổi gặp.",l:["Tra cứu thông tin cơ bản; chuẩn bị câu hỏi theo template với hỗ trợ","Research sâu ngành; chuẩn bị hypothesis về pain point","Discovery brief chi tiết; anticipate phản đối trước khi meeting diễn ra"]},
   {n:"Consultative Questioning",desc:"Dùng câu hỏi mở để Nhận biết → Thấu hiểu → Hóa giải bài toán KH.",l:["Đặt câu hỏi mở theo script; ghi chép chính xác không ngắt lời","Chuyển đổi linh hoạt open–probing–clarifying; phát hiện mâu thuẫn trong lời KH","Dẫn dắt tự nhiên; khiến KH tự nhận ra vấn đề và nhu cầu của chính mình"]},
   {n:"Process Analysis",desc:"Đọc dữ liệu KH để xác định quy trình ưu tiên cần demo trước.",l:["Đọc dữ liệu KH cơ bản; phân biệt quy trình quan trọng và ít quan trọng","Phân tích độc lập; xác định bottleneck và ưu tiên can thiệp","Thiết kế lại kiến trúc vận hành; kết nối nhiều quy trình phức tạp"]},
   {n:"Systems Thinking",desc:"Vẽ bài toán hỗn loạn thành sơ đồ rõ ràng ngay tại chỗ.",l:["Vẽ flowchart đơn giản sau meeting; phân biệt Input–Process–Output","Whiteboard trực tiếp trong meeting; xác định bottleneck độc lập","Thiết kế solution architecture phức tạp đa quy trình"]}
 ]},
 {n:"Solution Design & Demo Craft",d:[
   {n:"Requirements Mapping",desc:"Chuyển bài toán KH thành cấu hình sản phẩm cụ thể, có logic.",l:["Map requirements theo hướng dẫn; đề xuất 1 phương án cơ bản","Thiết kế end-to-end solution 3–5 modules; đề xuất 2–3 phương án với trade-off","Kiến trúc đa module phức tạp; thiết kế lộ trình triển khai theo phase"]},
   {n:"Product Setup & Config",desc:"Setup hệ thống demo chính xác, phản ánh đúng bài toán và dữ liệu của KH.",l:["Setup Work+ với dữ liệu mẫu theo hướng dẫn; hoàn thành trong 8–12h","Setup end-to-end 3+ modules trong 24h; import data thực của KH","Build demo library chuẩn; config showcase \"wow\" trong 4h"]},
   {n:"Showcase Delivery",desc:"Biến demo kỹ thuật thành câu chuyện kinh doanh thuyết phục.",l:["Trình bày theo flow cố định; sử dụng ngôn ngữ và dữ liệu KH cơ bản","Lồng dữ liệu thực tế KH vào demo; áp dụng 5-Act Play / If-Then nhất quán","Narrative cá nhân hóa cho từng stakeholder; tạo aha moment có chủ đích"]},
   {n:"Objection Handling",desc:"Xử lý phản đối bằng 5Cs: Curiosity → Clarify → Confirm → Communicate → Close.",l:["Có câu trả lời chuẩn cho top 10 objections phổ biến","Áp dụng 5Cs nhất quán; train admin / end-user độc lập","Anticipate phản đối trước khi xảy ra; biến objection thành lý do mua"]}
 ]},
 {n:"Communication & Presentation",d:[
   {n:"Executive Communication",desc:"Trình bày ngắn gọn, đúng trọng tâm với tất cả cấp lãnh đạo.",l:["Giao tiếp rõ ràng với D-level; cần hỗ trợ khi làm việc với C-level","Tự tin present với C-level và D-level; điều chỉnh message theo từng cấp","Trusted Advisor được C-level tin tưởng; ảnh hưởng quyết định mua"]},
   {n:"Document & Proposal",desc:"Viết solution doc, proposal và RFP response chất lượng cao.",l:["Soạn solution document theo template chuẩn","Cá nhân hóa proposal cho từng KH; viết RFP response độc lập","Xây thư viện template cho team; viết white paper"]},
   {n:"Internal Collaboration",desc:"Làm việc hiệu quả với AM, CO và các team nội bộ.",l:["Cập nhật AM về deal status; biết khi nào escalate","Chủ động coordinate AM/CO/Product; bridge thông tin giữa các team","Thiết kế engagement model SoE–AM–CO–CSM"]},
   {n:"Tech-to-Biz Translation",desc:"Giải thích tính năng kỹ thuật bằng ngôn ngữ business, không cần IT.",l:["Giải thích bằng ví dụ đời thực; tránh jargon kỹ thuật với non-IT","Chuyển mọi tính năng thành lợi ích kinh doanh cụ thể","Tạo framework ngôn ngữ nhất quán cho toàn team"]}
 ]},
 {n:"Execution Excellence",d:[
   {n:"Pipeline Management",desc:"Xử lý nhiều deal song song với chất lượng cao và đúng deadline.",l:["Quản lý 1–2 deal song song; dùng checklist; báo cáo blocker đúng lúc","Quản lý 4–6 deal song song; chủ động cập nhật AM; buffer plan","Portfolio deal chiến lược; thiết kế SoE engagement model"]},
   {n:"Attention to Detail",desc:"Cấu hình chính xác từng chi tiết — không để sót sai sót ảnh hưởng showcase.",l:["Cấu hình đúng checklist có sẵn; kiểm tra kỹ với hỗ trợ mentor","Tự review chất lượng; phát hiện và sửa lỗi trước khi KH phát hiện","Xây QA checklist chuẩn cho team; zero defect trong showcase"]},
   {n:"Resilience & Improvement",desc:"Không bỏ cuộc khi gặp khó, tự rút kinh nghiệm liên tục.",l:["Hoàn thành task dù phải làm lại; không để áp lực ảnh hưởng output","Tự tìm giải pháp; tổng kết bài học sau mỗi deal và áp dụng ngay","Biến thất bại thành playbook học chung cả tổ chức"]},
   {n:"AI & Self-Learning",desc:"Chủ động tự học và dùng AI để nâng cao năng suất.",l:["Dùng Google và AI cơ bản để tự học module mới hoặc research ngành","Dùng AI compress research time; tự học module mới trong 2–3 ngày","Xây AI workflow cá nhân; chia sẻ best practice cho team"]}
 ]},
 {n:"Revenue & Customer-Success",d:[
   {n:"Revenue Mindset",desc:"Track Win Rate và ARPD cá nhân — không chỉ số deal và số demo.",l:["Hiểu liên hệ demo quality và win rate; track KPI cá nhân hàng tuần","Chủ động tối ưu win rate; propose deal strategy cho AM","Co-own deal strategy với AM; tác động trực tiếp lên deal size và pricing"]},
   {n:"Deal Strategy",desc:"Phối hợp chiến lược với AM để tối đa hóa xác suất thắng deal.",l:["Thực hiện theo deal strategy AM; đóng góp ý kiến về technical fit","Chủ động propose kế hoạch showcase; xác định champion, economic buyer","Dẫn dắt chiến lược deal phức tạp; tư vấn AM về timing và pricing"]},
   {n:"Ethical Selling",desc:"Tư vấn trung thực — không oversell, build trust dài hạn.",l:["Không hứa tính năng không có; báo cáo honest fit / unfit cho AM","Tư vấn phương án phù hợp nhất dù không phải gói cao nhất","Tiêu chuẩn đạo đức cho team; từ chối deal không fit và giải thích rõ"]},
   {n:"Adoption Orientation",desc:"Thiết kế giải pháp có tính đến adoption từ giai đoạn pre-sales.",l:["Đánh giá fit / unfit trước khi commit; handover đủ context cho CO","Thiết kế giải pháp tính đến adoption; lập roadmap onboarding cơ bản","Tác động lên customer success metric từ giai đoạn pre-sales"]}
 ]}
];

var SPEC=[
 {n:"Module Mastery",desc:"Thành thạo ≥ 1 bộ sản phẩm Base ở mức chuyên sâu.",items:["Work+ Suite (Wework/Service/AI): QLCV và quy trình dịch vụ","Info+ Suite (Office/Booking/Meeting): quản lý hành chính số","HRM+ Suite (HRM/Timeoff/Schedule/Payroll): nhân sự và tính lương","CRM & Goal & Finance+: bán hàng, OKR và kiểm soát ngân sách"],ex:"SoE chuyên Work+ biết ngay khi nào dùng Wework vs Service vs Table — và giải thích trade-off cho KH trong 2 phút mà không cần tra tài liệu."},
 {n:"Industry Vertical",desc:"Hiểu sâu ≥ 1 ngành: pain điển hình, KPI và đặc thù vận hành.",items:["Manufacturing: quản lý ca, NCR tracking, báo cáo sản lượng real-time","Retail/F&B/Logistics: nhân sự nhiều ca, chuỗi cửa hàng, dispatch","Professional Services: project-based, billable hours, client management"],ex:"SoE chuyên sản xuất vào phòng là hỏi ngay \"anh/chị đang track NCR theo cách nào?\" — câu hỏi này chứng tỏ họ hiểu ngành, không phải chỉ biết sản phẩm."},
 {n:"Business Analysis",desc:"Phân tích nghiệp vụ và thiết kế giải pháp từ dữ liệu thực.",items:["Process Discovery: phỏng vấn stakeholder, vẽ as-is process map","Requirements: phân biệt must-have vs nice-to-have cho từng deal","Fit Assessment: đánh giá fit / unfit score % cho từng yêu cầu","Solution Architecture: vẽ luồng dữ liệu và integration point"],ex:"KH có 15 yêu cầu → SoE đánh giá nhanh: 10 cover 100%, 3 cover 80%, 2 không cover. Đề xuất pilot với 10 cái đầu, roadmap phần còn lại."},
 {n:"Solution Packaging",desc:"Đóng gói tài liệu giúp team deal hiệu quả và scalable hơn.",items:["Demo Library: environment chuẩn theo ngành để tái sử dụng","Battle Cards: điểm Base vượt trội vs Misa, Zoho, Odoo, FastWork","Case Study: phỏng vấn KH thành công, ghi số liệu cụ thể","RFP Response: template executive summary và technical response"],ex:"Demo library cho ngành sản xuất → AM mở lên là đã có sẵn data phù hợp ngành. Tiết kiệm 4–6h setup mỗi deal."},
 {n:"Data & Analytics",desc:"Dùng dữ liệu để tư vấn tốt hơn và chứng minh giá trị bằng con số.",items:["ROI Calculation: payback period, TCO, cost saving cụ thể cho từng KH","Dashboard Design: config report phù hợp role của từng stakeholder","Adoption Metrics: track active users, feature usage 30-60-90 ngày","Baseline Collection: số giờ thủ công, % sai sót, tiền mất/tháng"],ex:"\"Hiện anh mất 40h nhân công/tháng tổng hợp báo cáo. Với Base còn 4h. Tiết kiệm 36h × 100K = 3,6 triệu/tháng. Payback 2 tháng.\""},
 {n:"Customer Enablement",desc:"Đào tạo KH sử dụng hiệu quả để đảm bảo adoption cao sau triển khai.",items:["Admin Training: setup user, phân quyền, maintain hệ thống tự chủ","End-user Training: \"learn by doing\" với dữ liệu thực của KH","Change Management: identify stakeholder kháng cự, pilot với champion trước","Handover: brief đủ context cho CO để không phải làm lại từ đầu"],ex:"Training tốt = KH admin tự thêm user mới, tạo workflow mới mà không cần gọi Base. Đây là thước đo adoption thật."}
];

var LEAD=[
 {n:"Leads Self",desc:"Phát triển bản thân liên tục.",items:["Self-Awareness: xin feedback sau mỗi deal, viết weekly reflection 3 câu","Growth Mindset: tự học module mới trước khi deal cần","Integrity: báo cáo deal unfit honest với AM dù biết sẽ giảm pipeline","AI Agility: dùng AI compress research time — nhân bản tốc độ, không thay thế tư duy"],ex:"Sau deal lost: viết 3 điều làm tốt, 3 điều nên làm khác, 1 action cụ thể cho deal sau. Deal thứ 10 không nên mắc lỗi của deal thứ 2."},
 {n:"Leads Others",desc:"Dẫn dắt đồng nghiệp đạt kết quả cao hơn.",items:["Develops: review solution doc của junior, feedback actionable trong 24h","Builds Trust: giữ đúng cam kết với AM — hứa deliver trong 24h thì deliver đúng","Collaboration: brief AM sau discovery trong 5 phút; kéo CO vào sớm","Mentoring: khi junior hỏi, hỏi lại \"bạn đang nghĩ đến approach nào?\""],ex:"Junior chuẩn bị showcase sai hướng → không chỉ sửa, mà ngồi lại hỏi \"tại sao bạn chọn module này?\" Để họ tự tìm ra gap trong tư duy."},
 {n:"Leads Organization",desc:"Build SoE function và tạo impact ở cấp tổ chức.",items:["Methodology: viết và maintain SoE Playbook — discovery, showcase, proposal, handover","Standards: define tiêu chuẩn chất lượng demo; QA checklist cho toàn team","Product Feedback: tổng hợp top gaps từ deal lost → present cho PM với data","Thought Leadership: chia sẻ về CĐS SME Việt Nam tại sự kiện ngành"],ex:"Sau 10 deal lost vì tính năng X → viết report 1 trang: use case, tần suất/quý, business impact với số liệu. Present cho PM."}
];

var CP=[
 {intro:"Vẫn muốn ở trong ngành tech — SoE có optionality cực lớn vì ở intersection của technical và commercial.",cards:[
   {k:"IC track",h:"Principal / Staff SE",p:"Chỉ vào các deal phức tạp nhất, enterprise, multi-year. Impact ngang VP Sales về revenue. Lộ trình Base: SoE Associate → SoE → Senior SoE → SoE Lead / Principal."},
   {k:"Product",h:"Product Management",p:"Lợi thế: biết gap sản phẩm nào làm mất deal nhiều nhất — market insight sắc bén. Gap cần bù: execution, work với engineering, viết PRD, prioritize ruthlessly."},
   {k:"Sales",h:"Enterprise Sales / AM",p:"Hiểu technical sâu hơn AM thuần — tự làm discovery lẫn demo trong cùng buổi. Thích nghi cần thiết: quen với quota cá nhân thay vì shared metric."},
   {k:"BD",h:"Strategic Partnerships / BD",p:"Biết position sản phẩm trong bối cảnh ecosystem. Kết hợp commercial sense với technical credibility — profile hiếm trong BD."}
 ]},
 {intro:"SoE không chỉ apply được vào Pre-Sales tech. Kỹ năng mang theo: structured problem-solving at speed · commercial instinct + technical credibility · consultative selling · change management lite · multi-stakeholder navigation.",cards:[
   {k:"Corporate",h:"Tập đoàn lớn",p:"BD Manager, Key Account Manager enterprise, Digital Innovation Lead. Hiểu business operations nhiều ngành — lợi thế lớn so với internal candidates."},
   {k:"Consulting",h:"Management Consulting",p:"Deloitte, KPMG, McKinsey Advisory. Cần người vừa tư vấn business transformation vừa có hands-on implementation knowledge — SoE có profile này tự nhiên hơn consultant thuần."},
   {k:"SME",h:"SME / Doanh nghiệp gia đình",p:"Giám đốc Vận hành, Head of Digital Transformation. Thực chất là COO — impact rõ ràng, equity possible. Nhiều DN gia đình đang chuyển giao thế hệ."},
   {k:"Solo",h:"Independent Consultant",p:"Sau 5+ năm · $50–150/giờ. Digital transformation, technology selection cho SME. Cần ≥ 3 case study có số liệu. Có cả non-profit: USAID, World Bank, ADB."}
 ]},
 {intro:"Không có câu trả lời đúng sai — phụ thuộc bạn đang ở giai đoạn nào và muốn build cái gì.",cards:[
   {k:"Startup",h:"Startup (như Base)",p:"Breadth, deal volume cao (30–50 deals/3 năm), autonomy thật, credit \"founding member\". Rủi ro: thiếu senior mentor, dễ học bad habits. Hợp 22–26 tuổi, có entrepreneurial streak."},
   {k:"MNC",h:"MNC (SAP/Oracle/Salesforce)",p:"Methodology proven, credential mở cửa, enterprise deal phức tạp. Rủi ro: volume thấp (5–8 deals/3 năm), bureaucracy, dễ chạy standard demo script. Hợp 27–32 tuổi đã có nền."},
   {k:"Quan điểm",h:"Cái học được > tên công ty",p:"Một SoE ở Base học được consultative selling thật có giá trị hơn một SoE ở MNC chỉ chạy standard demo script — ít nhất trong 5 năm đầu career."}
 ]},
 {intro:"Khi đánh giá bất kỳ career move nào, 3 câu hỏi này cho câu trả lời rõ hơn bất kỳ so sánh lương hay tên công ty nào.",cards:[
   {k:"01",h:"Tôi sẽ học được gì mà tôi chưa biết?",p:"Trước khi nhận offer: list 3 kỹ năng cụ thể sẽ develop trong 12 tháng đầu. Không list được = red flag. Trước khi rời chỗ hiện tại: \"mình đã học hết những gì nơi này có thể cho chưa?\""},
   {k:"02",h:"Ai là người tôi sẽ làm việc cùng?",p:"Mentor giỏi hơn 5 năm kinh nghiệm có thể compress timeline phát triển xuống còn một nửa. Gặp trực tiếp người bạn report vào: \"mình có muốn thành phiên bản của họ sau 5 năm không?\""},
   {k:"03",h:"Sau 3 năm, tôi được định vị thế nào trên thị trường?",p:"Không phải \"tôi làm được gì\" mà \"thị trường thấy tôi là ai\". Tìm 2–3 người đã làm vị trí đó 3 năm rồi rời đi — giờ họ làm gì? Trajectory rõ và đúng hướng → move."}
 ]}
];

var CHECKS=[
 {t:"pos",x:"Tôi muốn làm thật với người thật — không phải project mô phỏng hay rotation 6 tháng/phòng"},
 {t:"pos",x:"Tôi tò mò về cách doanh nghiệp vận hành và muốn là người giúp họ giải quyết bài toán đó"},
 {t:"pos",x:"Tôi sẵn sàng học bằng cách làm — chịu được cảm giác không biết câu trả lời ngay lập tức"},
 {t:"pos",x:"Sau 2 năm, tôi muốn có thể ngồi với CEO của bất kỳ doanh nghiệp nào và có ích ngay lập tức"},
 {t:"pos",x:"Tôi đang cảm thấy bí ở công việc hiện tại — làm đi làm lại việc giống nhau, không thấy growth"},
 {t:"neg",x:"Tôi đang cân nhắc giữa Base và MT program MNC — và lý do chính là tên công ty trên CV"},
 {t:"neg",x:"Tôi muốn structure rõ ràng từng ngày và không thích ambiguity trong giai đoạn đầu"},
 {t:"neg",x:"Lương cứng 8M trong giai đoạn đầu là dealbreaker với tôi ở giai đoạn này"}
];

/* ============ RENDER ============ */
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}

/* stage panels */
(function(){
 var host=document.getElementById('stage-panels');
 STAGES.forEach(function(s,i){
   var p=el('div','tabpanel'+(i===0?' on':''));p.dataset.stage=i;
   var mk=function(label,arr,color){
     return '<div class="card" style="margin-bottom:12px"><span class="k" style="color:'+color+'">'+label+'</span><ul>'+arr.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul></div>';
   };
   p.innerHTML='<div class="note" style="margin-bottom:14px">'+s.ctx+'</div>'+
     '<div class="grid g-3" style="margin-bottom:12px">'+mk('Technician',s.t,'#1650EF')+mk('Consultant',s.c,'#15803D')+mk('Storyteller',s.s,'#B7791F')+'</div>'+
     '<div class="card"><span class="k">Cách nâng lên</span><ul>'+s.up.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul></div>';
   host.appendChild(p);
 });
 document.querySelectorAll('[data-stage]').forEach(function(b){
   if(b.tagName!=='BUTTON')return;
   b.addEventListener('click',function(){
     document.querySelectorAll('.tabs [data-stage]').forEach(function(x){x.setAttribute('aria-selected','false');});
     b.setAttribute('aria-selected','true');
     document.querySelectorAll('#stage-panels .tabpanel').forEach(function(x){x.classList.toggle('on',x.dataset.stage===b.dataset.stage);});
   });
 });
})();

/* core competency chips */
(function(){
 var chips=document.getElementById('core-chips'),detail=document.getElementById('core-detail'),open=-1;
 CORE.forEach(function(c,i){
   var dims=c.d.map(function(dm){return '<div class="cc-dim">'+dm.n+'</div>';}).join('');
   var b=el('button',null,'<div class="cc-head">'+c.n+'</div><div class="cc-dims">'+dims+'</div>');
   b.type='button';
   b.setAttribute('aria-pressed','false');
   b.addEventListener('click',function(){
     if(open===i){b.setAttribute('aria-pressed','false');detail.classList.remove('on');open=-1;return;}
     chips.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false');});
     b.setAttribute('aria-pressed','true');open=i;renderCore(i);
   });
   chips.appendChild(b);
 });
 function renderCore(i){
   var c=CORE[i];
   var h='<h4>'+c.n+'</h4><div class="dimtabs" role="tablist">';
   c.d.forEach(function(dm,j){h+='<button role="tab" aria-selected="'+(j===0)+'" data-d="'+j+'">'+dm.n+'</button>';});
   h+='</div><div id="dim-body"></div>';
   detail.innerHTML=h;detail.classList.add('on');
   var body=detail.querySelector('#dim-body');
   function dimBody(j){
     var dm=c.d[j],names=['L1 · Foundational','L2 · Intermediate','L3 · Advanced'],cls=['l1','l2','l3'];
     body.innerHTML='<p class="dim-desc">'+dm.desc+'</p>'+dm.l.map(function(txt,k){
       return '<div class="lvl '+cls[k]+'"><span class="b">'+names[k]+'</span><p>'+txt+'</p></div>';
     }).join('');
   }
   dimBody(0);
   detail.querySelectorAll('[data-d]').forEach(function(t){
     t.addEventListener('click',function(){
       detail.querySelectorAll('[data-d]').forEach(function(x){x.setAttribute('aria-selected','false');});
       t.setAttribute('aria-selected','true');dimBody(+t.dataset.d);
     });
   });
 }
})();

/* Specialist Competencies — pill-tab + 1 panel dùng chung, đóng mặc định, toggle */
(function(){
 var tabs=document.getElementById('spec-tabs'),panel=document.getElementById('spec-panel'),open=-1;
 SPEC.forEach(function(s,i){
   var b=el('button',null,s.n);
   b.type='button';
   b.setAttribute('aria-pressed','false');
   b.addEventListener('click',function(){
     if(open===i){ open=-1; tabs.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false');}); panel.classList.remove('on'); return; }
     open=i;
     tabs.querySelectorAll('button').forEach(function(x,j){ x.setAttribute('aria-pressed', String(j===i)); });
     render(i);
   });
   tabs.appendChild(b);
 });
 function render(i){
   var s=SPEC[i];
   panel.innerHTML='<h4>'+s.n+'</h4><p class="desc">'+s.desc+'</p>'+
     '<blockquote><b>Ví dụ:</b> '+s.ex+'</blockquote>'+
     '<ul>'+s.items.map(function(it){return '<li>'+it+'</li>';}).join('')+'</ul>';
   panel.classList.add('on');
 }
})();

/* Leadership Dimensions — pill-tab + 1 panel dùng chung, đóng mặc định, toggle */
(function(){
 var tabs=document.getElementById('lead-tabs'),panel=document.getElementById('lead-panel'),open=-1;
 LEAD.forEach(function(s,i){
   var b=el('button',null,s.n);
   b.type='button';
   b.setAttribute('aria-pressed','false');
   b.addEventListener('click',function(){
     if(open===i){ open=-1; tabs.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false');}); panel.classList.remove('on'); return; }
     open=i;
     tabs.querySelectorAll('button').forEach(function(x,j){ x.setAttribute('aria-pressed', String(j===i)); });
     render(i);
   });
   tabs.appendChild(b);
 });
 function render(i){
   var s=LEAD[i];
   panel.innerHTML='<h4>'+s.n+'</h4><p class="desc">'+s.desc+'</p>'+
     '<blockquote><b>Ví dụ:</b> '+s.ex+'</blockquote>'+
     '<ul>'+s.items.map(function(it){return '<li>'+it+'</li>';}).join('')+'</ul>';
   panel.classList.add('on');
 }
})();

/* career path panels */
(function(){
 var host=document.getElementById('cp-panels');
 CP.forEach(function(cp,i){
   var p=el('div','tabpanel'+(i===0?' on':''));p.dataset.cp=i;
   p.innerHTML='<p class="lead" style="font-size:.9rem;margin-bottom:16px">'+cp.intro+'</p>'+
     '<div class="grid g-2 stagger">'+cp.cards.map(function(c){
       return '<div class="card"><span class="k">'+c.k+'</span><h3>'+c.h+'</h3><p>'+c.p+'</p></div>';
     }).join('')+'</div>';
   host.appendChild(p);
 });
 document.querySelectorAll('.tabs [data-cp]').forEach(function(b){
   b.addEventListener('click',function(){
     document.querySelectorAll('.tabs [data-cp]').forEach(function(x){x.setAttribute('aria-selected','false');});
     b.setAttribute('aria-selected','true');
     document.querySelectorAll('#cp-panels .tabpanel').forEach(function(x){
       var on=x.dataset.cp===b.dataset.cp;x.classList.toggle('on',on);
       if(on)x.querySelectorAll('.stagger').forEach(function(s){s.classList.add('in');});
     });
   });
 });
})();

/* self-check */
(function(){
 var host=document.getElementById('checklist'),box=document.getElementById('check-result'),counter=document.getElementById('check-progress'),state={};
 CHECKS.forEach(function(c,i){
   var d=el('div','check-item'+(c.t==='neg'?' neg':''));
   d.innerHTML='<span class="box"><svg><use href="#'+(c.t==='neg'?'i-x':'i-check')+'"/></svg></span><p>'+c.x+'</p>';
   d.addEventListener('click',function(){
     state[i]=!state[i];d.classList.toggle('on',state[i]);update();
   });
   host.appendChild(d);
 });
 function update(){
   var pos=0,neg=0,any=0;
   CHECKS.forEach(function(c,i){if(state[i]){any++;if(c.t==='pos')pos++;else neg++;}});
   if(counter) counter.textContent='Đã chọn '+any+'/'+CHECKS.length;
   if(!any){box.classList.remove('on');return;}
   box.classList.add('on');
   if(neg>=2){box.style.background='var(--neg-soft)';box.style.borderColor='#F3D0CE';
     box.innerHTML='<b style="color:var(--neg)">Hãy cân nhắc thêm</b><p>Bạn chọn một số điểm "không phù hợp". Không sao — có thể lúc này chưa phải thời điểm đúng. Base phù hợp nhất khi bạn ưu tiên growth tốc độ và learning thực chiến hơn sự an toàn của môi trường structured.</p>';
   }else if(pos>=3){box.style.background='var(--pos-soft)';box.style.borderColor='#CBEBD5';
     box.innerHTML='<b style="color:var(--pos)">Có vẻ bạn đang phù hợp</b><p>Những gì bạn chọn cho thấy mindset phù hợp với SoE tại Base. Bước tiếp theo: apply và để buổi phỏng vấn vòng 2 với SoE Leader xác nhận thêm — đó là nơi cả hai bên thực sự hiểu nhau.</p>';
   }else{box.style.background='var(--bg-tint)';box.style.borderColor='var(--line)';
     box.innerHTML='<p>Tiếp tục chọn để xem kết quả phân tích rõ hơn.</p>';
   }
 }
})();

/* mini-quiz archetype (tab 02) */
(function(){
 var ARCH={
   technician:{n:'The Technician',d:'Bạn mạnh về nắm chắc sản phẩm và cấu hình nhanh — nền tảng bắt buộc trước khi build thêm chất Consultant lên trên.'},
   storyteller:{n:'The Storyteller',d:'Bạn giỏi kết nối và kể chuyện — nhớ bồi thêm chiều sâu kỹ thuật để không chỉ dừng ở "bán khí công".'},
   consultant:{n:'The Consultant',d:'Bạn thiên về tư vấn thật sự — đúng archetype lý tưởng mà một SoE giỏi hướng tới sau 2–3 năm.'},
   hybrid:{n:'The Hybrid Builder',d:'Bạn thích nhân bản impact qua người khác — tố chất của một SoE Lead tương lai.'}
 };
 var root=document.querySelector('.quiz-box');
 if(!root) return;
 var answers={}, qs=root.querySelectorAll('.quiz-q');
 var progressEl=document.getElementById('quiz-progress'), resultEl=document.getElementById('quiz-result');

 function showResult(){
   var tally={};
   Object.keys(answers).forEach(function(k){ var a=answers[k]; tally[a]=(tally[a]||0)+1; });
   var vals=Object.keys(tally).map(function(k){return tally[k];});
   var max=Math.max.apply(null,vals);
   var winners=Object.keys(tally).filter(function(k){ return tally[k]===max; });
   var html='<b>'+winners.map(function(w){return ARCH[w].n;}).join(' & ')+'</b>';
   html+=winners.map(function(w){return '<p>'+ARCH[w].d+'</p>';}).join('');
   html+='<button class="btn btn-ghost btn-sm" id="quiz-reset" type="button">Làm lại →</button>';
   resultEl.innerHTML=html;
   resultEl.classList.add('on');
   document.getElementById('quiz-reset').addEventListener('click',reset);
 }
 function updateProgress(){
   var n=Object.keys(answers).length;
   if(progressEl) progressEl.textContent='Đã trả lời '+n+'/'+qs.length;
   if(n===qs.length) showResult();
   else { resultEl.classList.remove('on'); resultEl.innerHTML=''; }
 }
 function reset(){
   answers={};
   root.querySelectorAll('.quiz-option.on').forEach(function(o){ o.classList.remove('on'); });
   updateProgress();
 }
 qs.forEach(function(q,i){
   q.querySelectorAll('.quiz-option').forEach(function(btn){
     btn.addEventListener('click',function(){
       q.querySelectorAll('.quiz-option').forEach(function(b){ b.classList.remove('on'); });
       btn.classList.add('on');
       answers[i]=btn.dataset.arch;
       updateProgress();
     });
   });
 });
})();

/* ============ MAIN TAB NAVIGATION (6 mục) ============ */
(function(){
 var TAB_IDS=['soe-la-gi','chan-dung','hanh-trinh','nang-luc','phu-hop','career-path'];
 var TAB_LABELS=['SoE là gì','Chân dung SoE giỏi','Hành trình phát triển','Năng lực cần build','Tôi có phù hợp?','Career path'];
 var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var current=null;
 var pillBtns=document.querySelectorAll('.maintabs button[data-tab]');
 var anchorEl=document.getElementById('maintabs-anchor');
 var progressEl=document.getElementById('tabs-progress');
 var VKEY='soe_visited_tabs';
 var visited={};
 try{ visited=JSON.parse(localStorage.getItem(VKEY)||'{}'); }catch(e){ visited={}; }

 function saveVisited(){ try{ localStorage.setItem(VKEY, JSON.stringify(visited)); }catch(e){} }
 function updateProgress(){
   var n=Object.keys(visited).length;
   if(progressEl) progressEl.textContent='Đã xem '+n+'/'+TAB_IDS.length+' mục';
   pillBtns.forEach(function(b){
     var dot=b.querySelector('.visited-dot');
     if(visited[b.dataset.tab]){ if(!dot){ dot=document.createElement('span'); dot.className='visited-dot'; b.appendChild(dot); } }
   });
 }
 function setActiveControls(id){
   pillBtns.forEach(function(b){
     var sel=b.dataset.tab===id;
     b.setAttribute('aria-selected', String(sel));
     if(sel) b.scrollIntoView({behavior: reduce?'auto':'smooth', inline:'center', block:'nearest'});
   });
 }
 function replay(panel){
   var els=panel.querySelectorAll('.reveal,.stagger');
   els.forEach(function(e){ e.classList.remove('in'); });
   void panel.offsetWidth;
   requestAnimationFrame(function(){ els.forEach(function(e){ e.classList.add('in'); }); });
 }
 function activateTab(id,push,scroll){
   if(TAB_IDS.indexOf(id)===-1) id=TAB_IDS[0];
   if(TAB_IDS.indexOf(id)>window.__soeProgress){ id=TAB_IDS[window.__soeProgress]; } // chặn nhảy cóc qua giai đoạn chưa mở khoá
   var next=document.getElementById(id);
   if(!next) return;
   if(current===next){ setActiveControls(id); return; }
   if(current){
     current.classList.remove('show');
     var prev=current;
     setTimeout(function(){ prev.classList.remove('on'); }, reduce?0:380);
   }
   next.classList.add('on');
   void next.offsetWidth;
   requestAnimationFrame(function(){ next.classList.add('show'); });
   replay(next);
   current=next;
   setActiveControls(id);
   if(!visited[id]){ visited[id]=true; saveVisited(); }
   updateProgress();
   window.dispatchEvent(new CustomEvent('soe:tabchange',{detail:{id:id}}));
   if(push!==false && location.hash.slice(1)!==id){ history.pushState(null,'','#'+id); }
   if(scroll!==false && anchorEl){ anchorEl.scrollIntoView({behavior: reduce?'auto':'smooth', block:'start'}); }
 }
 document.addEventListener('click',function(e){
   var a=e.target.closest('a[href^="#"]');
   if(!a) return;
   var id=a.getAttribute('href').slice(1);
   if(TAB_IDS.indexOf(id)!==-1){ e.preventDefault(); activateTab(id); }
 });
 pillBtns.forEach(function(b){ b.addEventListener('click',function(){ activateTab(b.dataset.tab); }); });
 window.addEventListener('popstate',function(){
   var id=location.hash.slice(1);
   activateTab(TAB_IDS.indexOf(id)!==-1?id:TAB_IDS[0], false);
 });

 /* thanh "Tiếp theo" cuối mỗi tab */
 TAB_IDS.forEach(function(id,i){
   var panel=document.getElementById(id);
   var wrap=panel&&panel.querySelector('.wrap');
   if(!wrap) return;
   var bar=el('div','tab-nextbar');
   if(i<TAB_IDS.length-1){
     var nextId=TAB_IDS[i+1], nextLabel=TAB_LABELS[i+1];
     bar.innerHTML='<span class="lbl">Tiếp theo: <b>'+String(i+2).padStart(2,'0')+' — '+nextLabel+'</b></span>'+
       '<button class="btn btn-primary btn-sm" type="button">Xem tiếp →</button>';
     bar.querySelector('button').addEventListener('click',function(){ activateTab(nextId); });
   }else{
     bar.innerHTML='<span class="lbl">Đã xem hết 6 mục — sẵn sàng chưa?</span>'+
       '<a class="btn btn-primary btn-sm" href="https://careers.base.vn" target="_blank" rel="noopener">Ứng tuyển tại careers.base.vn →</a>';
   }
   wrap.appendChild(bar);
 });

 var initial=TAB_IDS.indexOf(location.hash.slice(1))!==-1?location.hash.slice(1):TAB_IDS[0];
 activateTab(initial,false,false);
 updateProgress();
})();

/* ============ NAV SCROLL STATE + SCROLL PROGRESS ============ */
(function(){
 var nav=document.querySelector('.nav'),bar=document.getElementById('scroll-progress'),ticking=false;
 function update(){
   var y=window.scrollY||document.documentElement.scrollTop;
   nav.classList.toggle('scrolled', y>8);
   var doc=document.documentElement,max=doc.scrollHeight-doc.clientHeight;
   bar.style.width=(max>0?(y/max)*100:0)+'%';
   ticking=false;
 }
 window.addEventListener('scroll',function(){
   if(!ticking){ requestAnimationFrame(update); ticking=true; }
 },{passive:true});
 update();
})();

/* reveal on scroll */
(function(){
 var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var targets=document.querySelectorAll('.reveal,.stagger');
 if(reduce||!('IntersectionObserver' in window)){targets.forEach(function(t){t.classList.add('in');});return;}
 var io=new IntersectionObserver(function(entries){
   entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
 },{rootMargin:'0px 0px -8% 0px',threshold:.08});
 targets.forEach(function(t){io.observe(t);});
})();

/* hero stat count-up */
(function(){
 var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var nums=document.querySelectorAll('.stat b[data-count]');
 if(reduce){return;}
 var done=false;
 function run(){
   if(done)return;done=true;
   nums.forEach(function(n){
     var end=+n.dataset.count,pre=n.dataset.prefix||'',suf=n.dataset.suffix||'',t0=null,dur=900;
     function step(ts){
       if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);
       n.innerHTML=pre+Math.round(p*end)+suf;
       if(p<1)requestAnimationFrame(step);
     }
     requestAnimationFrame(step);
   });
 }
 var band=document.querySelector('.hero-stats');
 if('IntersectionObserver' in window){
   var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)run();});},{threshold:.4});
   io.observe(band);
 }else run();
})();

/* ============ ANALYTICS (localStorage nội bộ + gửi song song tới GA4) ============ *
 * Đo thời gian xem mỗi tab + số lần bấm theo khu vực trong tab.
 * Bản localStorage chỉ để debug nhanh trên máy — số liệu tổng hợp thật nằm trong GA4
 * (project G-VPZH1412XM, xem Realtime/Events). Mọi sự kiện gửi qua hàm ga() bên dưới. */
(function(){
 var KEY='soe_analytics_v1';
 var data={ tabTime:{}, clicks:{}, sessions:0 };
 try{ var saved=JSON.parse(localStorage.getItem(KEY)||'null'); if(saved) data=saved; }catch(e){}
 data.sessions=(data.sessions||0)+1;
 var curTab=null, tabStart=null;

 function ga(name,params){ try{ if(typeof gtag==='function') gtag('event',name,params||{}); }catch(e){} }
 window.soeGA=ga; // dùng lại ở IIFE game (archetype/level/journey) bên dưới

 function save(){ try{ localStorage.setItem(KEY, JSON.stringify(data)); }catch(e){} }
 function logSummary(){
   if(!window.console||!console.table) return;
   console.log('%c[SoE Analytics] Thời gian xem theo tab (giây):','color:#1650EF;font-weight:700');
   console.table(Object.keys(data.tabTime).map(function(k){ return {tab:k, giay:Math.round(data.tabTime[k]/1000)}; }));
   console.log('%c[SoE Analytics] Số lần bấm theo khu vực:','color:#1650EF;font-weight:700');
   console.table(Object.keys(data.clicks).map(function(k){ return {khu_vuc:k, so_lan:data.clicks[k]}; }));
 }
 function closeTab(){
   if(curTab && tabStart){ data.tabTime[curTab]=(data.tabTime[curTab]||0)+(Date.now()-tabStart); }
 }
 window.addEventListener('soe:tabchange', function(e){
   closeTab();
   curTab=e.detail.id; tabStart=Date.now();
   save(); logSummary();
   ga('tab_view',{tab_id:curTab});
 });
 document.addEventListener('visibilitychange', function(){
   if(document.hidden){ closeTab(); save(); }
   tabStart=Date.now();
 });
 window.addEventListener('pagehide', function(){ closeTab(); save(); });

 /* tab đầu tiên đã activateTab() trước khi IIFE này kịp đăng ký listener — khởi tạo thủ công */
 var already=document.querySelector('.tabpanel-main.on');
 if(already){ curTab=already.id; tabStart=Date.now(); ga('tab_view',{tab_id:curTab}); }

 var ZONES=[
   ['.maintabs button','pill-tab'],
   ['.tab-nextbar a,.tab-nextbar button','nextbar'],
   ['.finalcta-inline a','final-cta'],
   ['.journey-recap a','apply-recap'],
   ['#recap-copy','recap-copy'],
   ['.check-item','checklist-item'],
   ['.quiz-option','quiz-answer'],
   ['.arch-opt','archetype-answer'],
   ['#arch-go','archetype-confirm'],
   ['.gi-cta','game-start'],
   ['.flappy-sound','sound-toggle'],
   ['.corebar button','core-competency'],
   ['.spectabs button','specialist-tab'],
   ['details.acc summary','archetype-accordion'],
   ['.hero-actions a','hero-cta'],
   ['.tl-card','timeline-card'],
   ['.card','info-card'],
   ['.flappy','flappy-flap'],
   ['.flappy-static .tap-btn','flappy-static-tap'],
 ];
 document.addEventListener('click', function(e){
   for(var i=0;i<ZONES.length;i++){
     var m=e.target.closest(ZONES[i][0]);
     if(m){ data.clicks[ZONES[i][1]]=(data.clicks[ZONES[i][1]]||0)+1; save(); ga('click_zone',{zone:ZONES[i][1]}); return; }
   }
 });

 save();
})();

/* ============ FLAPPY STAGE GATE — mở khóa tuần tự 6 tab bằng game ============ */
(function(){
 var PKEY='soe_game_progress';
 var TAB_IDS=['soe-la-gi','chan-dung','hanh-trinh','nang-luc','phu-hop','career-path'];
 var LEVELS=[
  {name:'SoE là gì', mode:'fly',   sky1:'#0B1E52',sky2:'#17347A',pipe:'#3B7BF0',target:5,speed:170,gap:.42,
   labels:[
     {t:'Trước buổi gặp',d:'Research khách hàng, chuẩn bị 3 hypothesis trước khi vào phòng.'},
     {t:'Trong buổi gặp',d:'Nhận biết → Thấu hiểu → Hóa giải, dùng dữ liệu thật của khách.'},
     {t:'Sau buổi gặp',d:'Debrief với AM, track win rate — thắng hay thua đều biết rõ lý do.'},
     {t:'SoE ≠ Sales',d:'AM mạnh sensing; SoE bù đúng chỗ AM thiếu: product depth.'},
     {t:'SoE ≠ Support',d:'Support xử lý sau khi mua. SoE tư vấn trước khi mua.'}
   ]},
  {name:'Chân dung SoE giỏi', mode:'run', sky1:'#241A4D',sky2:'#3C2D78',pipe:'#8A7EE0',target:6,speed:182,gap:.40,
   labels:[
     {t:'The Technician',d:'"Tôi biết hết sản phẩm" — nền móng bắt buộc trước khi build thêm.'},
     {t:'The Storyteller',d:'Sensing tốt, mỏng về kỹ thuật — dễ bị hỏi dồn chi tiết.'},
     {t:'The Consultant',d:'Archetype lý tưởng — đích đến sau 2–3 năm.'},
     {t:'Hybrid Builder',d:'SoE Lead — nhân bản impact qua cả team, không chỉ deal của mình.'},
     {t:'5Cs',d:'Curiosity → Clarify → Confirm → Communicate → Close.'},
     {t:'Walk away',d:'Chủ động báo AM khi deal không fit — Trusted Advisor thật sự.'}
   ]},
  {name:'Hành trình phát triển', mode:'weave', sky1:'#3D2A0A',sky2:'#6B4A12',pipe:'#D69A3E',target:6,speed:188,gap:.38,
   labels:[
     {t:'Onboarding Training',d:'Làm chủ Base 1.0, sẵn sàng nhận khách hàng đầu tiên.'},
     {t:'SoE Support',d:'Vào deal PS/POD thật ở vai trò hỗ trợ, phân tích theo khung L.E.N.S.'},
     {t:'SoE Associate',d:'Mở rộng nghiệp vụ HRM+, HCNS, R&D — nâng chuẩn dẫn dắt.'},
     {t:'SoE Junior',d:'Tự đứng tên deal đầu tiên — ngừng học việc, bắt đầu tạo doanh thu.'},
     {t:'Năm 1',d:'Build foundation — win rate ~25%, ARPD 100–150tr/deal.'},
     {t:'Năm 3+',d:'Leadership fork — rẽ nhánh SoE Lead, SE Manager, Product, Entrepreneur.'}
   ]},
  {name:'Năng lực cần build', mode:'mix', sky1:'#0B1E52',sky2:'#173B9E',pipe:'#3B7BF0',target:6,speed:196,gap:.38,
   labels:null /* điền động từ CORE bên dưới */ },
  {name:'Tôi có phù hợp', mode:'precision', sky1:'#3A0F22',sky2:'#6B1F3F',pipe:'#DE5C86',target:7,speed:200,gap:.32,
   labels:[
     {t:'Vòng 1 · CV',d:'CV + trả lời ≤200 chữ về 1 lần giải quyết vấn đề phức tạp.'},
     {t:'Vòng 2 · Phỏng vấn',d:'Với SoE Leader — đánh giá potential & mindset, không phải kinh nghiệm.'},
     {t:'Vòng 3 · Conversation',d:'45 phút với SoE Manager — cả hai bên cùng quyết định.'},
     {t:'Bạn phù hợp nếu',d:'Muốn làm thật với người thật, sẵn sàng học bằng cách làm.'},
     {t:'Không phù hợp nếu',d:'Cần structure rõ từng ngày, hoặc 8M là dealbreaker.'},
     {t:'Tố chất thực sự',d:'Người có câu hỏi, không chỉ câu trả lời trôi chảy.'},
     {t:'Self-check',d:'8 câu tự đánh giá — không gửi dữ liệu đi đâu.'}
   ]},
  {name:'Career path', mode:'gauntlet', sky1:'#0B3A1E',sky2:'#15803D',pipe:'#3FBE72',target:8,speed:205,gap:.34,
   labels:[
     {t:'Ở lại tech',d:'Principal/Staff SE, Product Management, Enterprise Sales, BD.'},
     {t:'Ra ngoài tech',d:'Corporate, Management Consulting, SME, Independent Consultant.'},
     {t:'Startup vs MNC',d:'Cái học được > tên công ty, ít nhất trong 5 năm đầu.'},
     {t:'3 câu hỏi quyết định',d:'Học được gì? Làm cùng ai? Định vị thế nào sau 3 năm?'},
     {t:'SoE Lead/Principal',d:'IC track cao nhất — chỉ vào deal phức tạp nhất.'},
     {t:'SE Manager',d:'Quản lý team SoE — hire, develop, performance manage.'},
     {t:'Product/Strategy',d:'Biết gap sản phẩm nào làm mất deal nhiều nhất.'},
     {t:'Entrepreneur',d:'Market insight + product sense + commercial instinct.'}
   ]}
 ];
 LEVELS[3].labels = CORE.map(function(c){ return {t:c.n.replace('\n',' '), d:c.d.map(function(x){return x.n;}).join(' · ')}; });
 var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

 /* nhân vật hoá thân — tái dùng đúng dữ liệu + 4 câu hỏi archetype đã có ở tab Chân dung (ARCH),
    khai báo riêng trong IIFE này theo đúng tiền lệ TAB_IDS ở trên (duplicate hằng số nhỏ, không share global) */
 var AKEY='soe_archetype';
 var ARCH_QUIZ={
   order:['technician','consultant','storyteller','hybrid'],
   data:{
     technician:{n:'The Technician',d:'Bạn mạnh về nắm chắc sản phẩm và cấu hình nhanh — nền tảng bắt buộc trước khi build thêm chất Consultant lên trên.',icon:'#i-arch-technician',color:'#1650EF'},
     consultant:{n:'The Consultant',d:'Bạn thiên về tư vấn thật sự — đúng archetype lý tưởng mà một SoE giỏi hướng tới sau 2–3 năm.',icon:'#i-arch-consultant',color:'#15803D'},
     storyteller:{n:'The Storyteller',d:'Bạn giỏi kết nối và kể chuyện — nhớ bồi thêm chiều sâu kỹ thuật để không chỉ dừng ở "bán khí công".',icon:'#i-arch-storyteller',color:'#B7791F'},
     hybrid:{n:'The Hybrid Builder',d:'Bạn thích nhân bản impact qua người khác — tố chất của một SoE Lead tương lai.',icon:'#i-arch-hybrid',color:'#6D5BD0'}
   },
   qs:[
     {t:'1. Gặp một bài toán mới của khách hàng, phản xạ đầu tiên của bạn là gì?', opts:[
       {arch:'technician',t:'Mở ngay hệ thống, thử cấu hình xem giải pháp nào khả thi'},
       {arch:'storyteller',t:'Kể một câu chuyện tương tự đã từng gặp để tạo kết nối trước'},
       {arch:'consultant',t:'Hỏi thêm để hiểu vì sao bài toán này quan trọng với họ lúc này'},
       {arch:'hybrid',t:'Nghĩ ngay ai trong team từng gặp case tương tự để hỏi kinh nghiệm'}
     ]},
     {t:'2. Bạn tự tin nhất khi nào?', opts:[
       {arch:'technician',t:'Khi bị hỏi sâu chi tiết kỹ thuật của sản phẩm'},
       {arch:'storyteller',t:'Khi đứng trước đám đông kể chuyện, tạo cảm xúc'},
       {arch:'consultant',t:'Khi ngồi với người ra quyết định bàn chiến lược'},
       {arch:'hybrid',t:'Khi hướng dẫn, coach một người mới'}
     ]},
     {t:'3. Điều bạn ngại nhất trong công việc?', opts:[
       {arch:'technician',t:'Phải nói chuyện phiếm thay vì đi thẳng vào vấn đề'},
       {arch:'storyteller',t:'Bị hỏi dồn chi tiết kỹ thuật mình chưa nắm chắc'},
       {arch:'consultant',t:'Phải bán một thứ mà bạn biết khách không thực sự cần'},
       {arch:'hybrid',t:'Chỉ làm một mình, không ai để chia sẻ hay nhân bản cách làm'}
     ]},
     {t:'4. Bạn muốn được nhớ đến vì điều gì?', opts:[
       {arch:'technician',t:'Người nắm chắc sản phẩm nhất team'},
       {arch:'storyteller',t:'Người truyền cảm hứng, ai cũng thích nói chuyện cùng'},
       {arch:'consultant',t:'Người khách hàng tin tưởng tuyệt đối như cố vấn riêng'},
       {arch:'hybrid',t:'Người xây được cả một đội ngũ giỏi'}
     ]}
   ]
 };
 function getArchetype(){
   try{ var v=localStorage.getItem(AKEY); if(v && ARCH_QUIZ.data[v]) return v; }catch(e){}
   return null;
 }
 function saveArchetype(k){ try{ localStorage.setItem(AKEY,k); }catch(e){} }

 function buildArchSelect(container,onDone){
   var sky1=LEVELS[0].sky1, sky2=LEVELS[0].sky2;
   var answers=[];
   function renderQ(qi){
     var q=ARCH_QUIZ.qs[qi];
     container.innerHTML=
       '<div class="arch-gate" style="background:linear-gradient(160deg,'+sky1+','+sky2+')">'+
         '<div class="icon"><svg><use href="#i-spark"/></svg></div>'+
         '<b class="title">Trước khi bắt đầu — 10 năm nữa, bạn muốn định vị mình là ai?</b>'+
         '<p class="lead">4 câu hỏi nhanh, chọn phản xạ thật của bạn — hé lộ hình mẫu bạn đang hướng tới. Nhân vật này sẽ đồng hành xuyên suốt 6 chặng phía sau.</p>'+
         '<span class="arch-progress">Câu '+(qi+1)+'/'+ARCH_QUIZ.qs.length+'</span>'+
         '<p class="arch-qtext">'+q.t+'</p>'+
         '<div class="arch-opts">'+
           q.opts.map(function(o){ return '<button class="arch-opt" type="button" data-arch="'+o.arch+'">'+o.t+'</button>'; }).join('')+
         '</div>'+
       '</div>';
     container.querySelectorAll('.arch-opt').forEach(function(btn){
       btn.addEventListener('click',function(){
         answers.push(btn.dataset.arch);
         if(qi+1<ARCH_QUIZ.qs.length) renderQ(qi+1); else renderResult();
       });
     });
   }
   function computeWinner(){
     var tally={};
     answers.forEach(function(a){ tally[a]=(tally[a]||0)+1; });
     var max=-1,winner=ARCH_QUIZ.order[0];
     ARCH_QUIZ.order.forEach(function(k){ var v=tally[k]||0; if(v>max){ max=v; winner=k; } });
     return winner;
   }
   function renderResult(){
     var key=computeWinner(), av=ARCH_QUIZ.data[key];
     container.innerHTML=
       '<div class="arch-gate" style="background:linear-gradient(160deg,'+sky1+','+sky2+')">'+
         '<div class="arch-result">'+
           '<div class="badge"><svg><use href="'+av.icon+'"/></svg></div>'+
           '<b>10 năm nữa, bạn định vị mình là: '+av.n+'</b>'+
           '<p>'+av.d+'</p>'+
           '<div class="row">'+
             '<button class="btn btn-outline-dark btn-sm" type="button" id="arch-retry">Làm lại →</button>'+
             '<button class="btn btn-dark btn-sm" type="button" id="arch-go">Bắt đầu hành trình →</button>'+
           '</div>'+
         '</div>'+
       '</div>';
     container.querySelector('#arch-retry').addEventListener('click',function(){ answers=[]; renderQ(0); });
     container.querySelector('#arch-go').addEventListener('click',function(){ saveArchetype(key); if(window.soeGA) soeGA('archetype_selected',{archetype:key}); onDone(); });
   }
   renderQ(0);
 }

 function saveProgress(p){ window.__soeProgress=p; try{ localStorage.setItem(PKEY,String(p)); }catch(e){} }

 /* âm thanh — tổng hợp bằng Web Audio API, không cần file ngoài; AudioContext khởi tạo lười ở lần bấm đầu */
 var SKEY='soe_sound_on';
 var soundOn = (function(){ try{ var v=localStorage.getItem(SKEY); return v===null?true:v==='1'; }catch(e){ return true; } })();
 var actx=null;
 function ac(){ if(!actx){ try{ actx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } return actx; }
 function tone(freq,dur,type,vol,delay){
   if(!soundOn) return;
   var a=ac(); if(!a) return;
   if(a.state==='suspended') a.resume();
   var t0=a.currentTime+(delay||0);
   var osc=a.createOscillator(), gain=a.createGain();
   osc.type=type||'square'; osc.frequency.setValueAtTime(freq,t0);
   gain.gain.setValueAtTime(0,t0);
   gain.gain.linearRampToValueAtTime(vol||.12,t0+.02);
   gain.gain.exponentialRampToValueAtTime(.001,t0+dur);
   osc.connect(gain); gain.connect(a.destination);
   osc.start(t0); osc.stop(t0+dur+.02);
 }
 var SFX={
   flap:function(){ tone(520,.09,'square',.07); },
   hit:function(){ tone(140,.18,'sawtooth',.14); },
   pass:function(){ tone(760,.08,'square',.09); tone(1020,.09,'square',.08,.06); },
   win:function(){ [660,880,1100,1320].forEach(function(f,idx){ tone(f,.16,'square',.1,idx*.09); }); },
   lose:function(){ tone(300,.22,'sawtooth',.12); tone(180,.28,'sawtooth',.1,.12); }
 };
 function setSoundOn(v){
   soundOn=v; try{ localStorage.setItem(SKEY,v?'1':'0'); }catch(e){}
   document.querySelectorAll('.flappy-sound').forEach(function(b){
     b.querySelector('svg use').setAttribute('href',soundOn?'#i-vol':'#i-mute');
     b.setAttribute('aria-label',soundOn?'Tắt âm thanh':'Bật âm thanh');
   });
 }

 /* hiệu ứng ăn mừng — mảnh confetti CSS, không canvas/thư viện ngoài */
 function burstConfetti(container,n,colors){
   if(!container) return;
   var cs=colors||['#fff','#FFD166','#7FA6FF','#8AF0C0'];
   for(var k=0;k<n;k++){
     var el=document.createElement('i');
     el.className='confetti-bit';
     var x=40+Math.random()*20; // % từ giữa
     var dx=(Math.random()*2-1)*140;
     var rot=(Math.random()*2-1)*260;
     var dur=.9+Math.random()*.6;
     el.style.cssText='left:'+x+'%;top:35%;background:'+cs[k%cs.length]+';--dx:'+dx+'px;--rot:'+rot+'deg;animation-duration:'+dur+'s;animation-delay:'+(Math.random()*.15)+'s';
     container.appendChild(el);
     (function(el,dur){ setTimeout(function(){ el.remove(); },(dur+.2)*1000); })(el,dur);
   }
 }

 /* thống kê mỗi chặng (số lần vấp + thời gian) — lưu localStorage để sống sót qua việc tải lại trang
    giữa chừng (tiến trình vốn đã lưu localStorage rồi, số liệu trước đây chỉ ở biến bộ nhớ nên bị mất) */
 var STATS_KEY='soe_stage_stats';
 var stageStats=(function(){ try{ return JSON.parse(localStorage.getItem(STATS_KEY))||[]; }catch(e){ return []; } })();
 function saveStageStats(){ try{ localStorage.setItem(STATS_KEY,JSON.stringify(stageStats)); }catch(e){} }

 /* khung cảnh riêng cho từng level — thuần CSS/SVG, không ảnh ngoài, chỉ dùng trong buildGame() */
 function sceneLayerHTML(i,cfg){
   if(i===0){ // trên mây — 2 lớp mây (xa chậm, gần nhanh hơn) để có cảm giác gió thổi rõ hơn
     return '<div class="flappy-scene">'+
       '<div class="scene-sun" style="top:8%;right:10%;width:70px;height:70px"></div>'+
       '<div class="scene-cloud far" style="top:12%;width:100px;height:36px;animation-duration:46s"></div>'+
       '<div class="scene-cloud far" style="top:34%;width:64px;height:26px;animation-duration:58s;animation-delay:-18s"></div>'+
       '<div class="scene-cloud far" style="top:58%;width:82px;height:30px;animation-duration:52s;animation-delay:-34s"></div>'+
       '<div class="scene-cloud far" style="top:78%;width:56px;height:22px;animation-duration:64s;animation-delay:-8s"></div>'+
       '<div class="scene-cloud near" style="top:24%;width:56px;height:20px;animation-duration:24s;animation-delay:-6s"></div>'+
       '<div class="scene-cloud near" style="top:50%;width:44px;height:16px;animation-duration:20s;animation-delay:-14s"></div>'+
       '<div class="scene-cloud near" style="top:70%;width:60px;height:22px;animation-duration:28s;animation-delay:-2s"></div>'+
     '</div>';
   }
   if(i===1){ // skyline thành phố lúc hoàng hôn
     var h=[26,38,30,46,32,40,28,36], html='<div class="flappy-scene">';
     h.forEach(function(hh,idx){
       var w=100/h.length;
       html+='<div class="scene-bld" style="left:'+(idx*w)+'%;width:'+(w-1)+'%;height:'+hh+'px">'+
         (idx%2===0?'<i class="scene-win" style="animation-delay:'+(idx*.4)+'s"></i>':'')+'</div>';
     });
     return html+'</div>';
   }
   if(i===2){ // dãy núi nhiều lớp — hành trình đi lên
     return '<div class="flappy-scene">'+
       '<svg class="scene-mtn scene-mtn-far" viewBox="0 0 400 100" preserveAspectRatio="none"><polygon points="0,100 0,55 60,25 130,60 200,20 270,58 340,30 400,52 400,100" fill="'+cfg.pipe+'" opacity=".28"/></svg>'+
       '<svg class="scene-mtn" viewBox="0 0 400 100" preserveAspectRatio="none"><polygon points="0,100 0,72 80,40 150,74 230,36 300,70 400,44 400,100" fill="'+cfg.pipe+'" opacity=".5"/></svg>'+
     '</div>';
   }
   if(i===3){ // mạng lưới năng lực
     var pts=[[10,20],[30,45],[15,68],[50,30],[45,62],[72,22],[68,55],[90,40]];
     var edges=[[0,1],[1,2],[1,3],[3,4],[3,5],[5,6],[6,7],[4,6]];
     var html='<div class="flappy-scene"><svg class="scene-net" viewBox="0 0 100 100" preserveAspectRatio="none">';
     edges.forEach(function(e){ var a=pts[e[0]],b=pts[e[1]]; html+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="'+cfg.pipe+'" stroke-width=".3" opacity=".3"/>'; });
     pts.forEach(function(pt,idx){ html+='<circle class="scene-node" cx="'+pt[0]+'" cy="'+pt[1]+'" r="1.5" fill="'+cfg.pipe+'" style="animation-delay:'+(idx*.35)+'s"/>'; });
     return html+'</svg></div>';
   }
   if(i===4){ // đèn bàn phỏng vấn
     return '<div class="flappy-scene">'+
       '<div class="scene-spot" style="background:radial-gradient(circle,rgba(255,255,255,.22),rgba(255,255,255,0) 65%)"></div>'+
       '<div class="scene-grid"></div>'+
     '</div>';
   }
   // i===5: nhiều vệt đường toả nhánh — rẽ nhánh sự nghiệp
   var angles=[-34,-18,-4,10,24,38], html='<div class="flappy-scene"><div class="scene-roads">';
   angles.forEach(function(a,idx){ html+='<i style="transform:rotate('+a+'deg);animation-delay:'+(idx*.5)+'s"></i>'; });
   return html+'</div></div>';
 }

 function contentEls(section){
   var wrap=section.querySelector('.wrap');
   var gate=wrap.querySelector('.stage-gate');
   var kids=Array.prototype.slice.call(wrap.children);
   var idx=kids.indexOf(gate);
   return kids.slice(idx+1);
 }
 function showContent(section){ contentEls(section).forEach(function(el){ el.classList.remove('stage-hidden'); }); }
 function hideContent(section){ contentEls(section).forEach(function(el){ el.classList.add('stage-hidden'); }); }
 function replayReveal(section){
   var els=section.querySelectorAll('.reveal,.stagger');
   els.forEach(function(e){ e.classList.remove('in'); });
   void section.offsetWidth;
   requestAnimationFrame(function(){ els.forEach(function(e){ e.classList.add('in'); }); });
 }

 function updatePills(){
   document.querySelectorAll('.maintabs button[data-tab]').forEach(function(b){
     var i=TAB_IDS.indexOf(b.dataset.tab);
     var locked=i>window.__soeProgress;
     b.classList.toggle('locked',locked);
     b.disabled=locked;
     var lockEl=b.querySelector('.lock');
     if(locked && !lockEl){
       lockEl=document.createElement('span'); lockEl.className='lock';
       lockEl.innerHTML='<svg style="width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2;vertical-align:-1px"><use href="#i-lock"/></svg>';
       b.appendChild(lockEl);
     }else if(!locked && lockEl){ lockEl.remove(); }
   });
 }

 function clearStage(i){
   if(i+1>window.__soeProgress) saveProgress(i+1);
   updatePills();
   var section=document.getElementById(TAB_IDS[i]);
   var gate=section.querySelector('.stage-gate');
   gate.classList.add('stage-hidden');
   showContent(section);
   replayReveal(section);
   if(i===5){ buildRecap(true); if(window.soeGA) soeGA('journey_completed',{archetype:getArchetype()||''}); }
 }

 function buildRecap(celebrate){
   var el=document.getElementById('journey-recap');
   if(!el || el.dataset.built) return;
   el.dataset.built='1';
   var avKey=getArchetype()||'technician', av=ARCH_QUIZ.data[avKey];
   var stagesHTML=LEVELS.map(function(lv,idx){
     var s=stageStats[idx];
     var st=s?('<span class="st-badge">💥 '+s.hits+'</span><span class="st-badge">⏱ '+s.time.toFixed(1)+'s</span>'):'';
     return '<li><span class="ic"><svg><use href="#i-check"/></svg></span><span class="nm">'+(idx+1)+'. '+lv.name+'</span><span class="st">'+st+'</span></li>';
   }).join('');
   var shareText='Tôi vừa hoàn thành hành trình 6 chặng khám phá vị trí Solutions Engineer @ Base.vn — hoá thân thành '+av.n+'. '+av.d+' Tìm hiểu thêm: careers.base.vn';
   el.innerHTML=
     '<div class="badge"><svg><use href="'+av.icon+'"/></svg></div>'+
     '<h3>Hành trình hoàn tất — với tư cách '+av.n+'</h3>'+
     '<p>'+av.d+' Bạn đã đi qua đủ 6 chặng, đúng tinh thần điềm đạm nhưng quyết liệt của một SoE.</p>'+
     '<ul class="stages">'+stagesHTML+'</ul>'+
     '<div class="row">'+
       '<button class="btn btn-outline-dark" id="recap-copy" type="button">Sao chép kết quả →</button>'+
       '<a class="btn btn-dark" href="https://careers.base.vn" target="_blank" rel="noopener">Apply tại careers.base.vn →</a>'+
     '</div>';
   if(celebrate) burstConfetti(el,40,['#fff','#FFD166','#7FA6FF','#8AF0C0']);
   var copyBtn=document.getElementById('recap-copy');
   copyBtn.addEventListener('click',function(){
     function done(){ copyBtn.textContent='Đã sao chép ✓'; setTimeout(function(){ copyBtn.textContent='Sao chép kết quả →'; },2000); }
     if(navigator.clipboard && navigator.clipboard.writeText){
       navigator.clipboard.writeText(shareText).then(done).catch(fallback);
     } else fallback();
     function fallback(){
       var ta=document.createElement('textarea');
       ta.value=shareText; ta.style.position='fixed'; ta.style.opacity='0';
       document.body.appendChild(ta); ta.select();
       try{ document.execCommand('copy'); }catch(e){}
       document.body.removeChild(ta);
       done();
     }
   });
 }

 /* màn mô tả trước khi vào từng chặng — giải thích concept, có nút bắt đầu riêng */
 var INTRO=[
   {ctaVerb:'Cất cánh',ctaIcon:'🛫',
    hook:'Mỗi thương vụ của Base đều xoay quanh một buổi gặp khách hàng — và cả buổi gặp đó chỉ gói trong 3 nhịp: trước khi bước vào phòng, trong lúc ngồi cùng khách, và sau khi rời đi. Nhận biết pain thật, thấu hiểu root cause, hóa giải lo ngại bằng chính dữ liệu của họ — đó là vòng đời một SoE sống mỗi ngày, không phải một dòng mô tả công việc suông. Bay qua từng cổng để tự mình đi hết vòng đời đó.',
    mech:'Bấm để bay xuyên khe hở.'},
   {ctaVerb:'Xuất phát',ctaIcon:'🏃',
    hook:'Ngoài kia có Technician chỉ giỏi sản phẩm, có Storyteller kể chuyện cuốn hút nhưng hụt hơi khi bị hỏi sâu — và có Consultant, đích đến mà một SoE giỏi hướng tới sau 2-3 năm rèn luyện. Không ai sinh ra đã là archetype lý tưởng, tất cả đều đi qua từng chướng ngại thật để định hình chân dung của mình. Nhảy qua từng cái, xem bạn lộ diện thành ai.',
    mech:'Bấm để nhảy né vật cản dưới đất.'},
   {ctaVerb:'Lên đường',ctaIcon:'🧗',
    hook:'Không ai đi thẳng lên đỉnh. Hành trình thật của một SoE đi qua Onboarding Training, SoE Support, SoE Associate, rồi mới tới SoE Junior — cột mốc đầu tiên tự đứng tên deal, ngừng học việc và bắt đầu tạo doanh thu thật. Mỗi giai đoạn là một lần bay cao rồi cúi thấp, không có lối tắt đi tắt đón đầu.',
    mech:'Bấm để bay cao, thả ra để hạ thấp.'},
   {ctaVerb:'Vào việc',ctaIcon:'🧩',
    hook:'Một SoE giỏi không giỏi một thứ — họ giỏi rất nhiều thứ cùng lúc, đúng tinh thần T-Shaped: rộng ở 6 năng lực cốt lõi từ đọc hiểu khách hàng, thiết kế giải pháp, đến thuyết trình trước C-level — và sâu ở ít nhất một chuyên môn riêng. Né đủ loại chướng ngại cùng lúc để cảm nhận đúng độ rộng thật của tấm bản đồ năng lực đó.',
    mech:'Bấm để bay, vừa né cổng vừa né vật cản mặt đất.'},
   {ctaVerb:'Vào phỏng vấn',ctaIcon:'🎯',
    hook:'Phù hợp hay không không phải chuyện may rủi — nó nằm ở vài câu hỏi rất thật: bạn có muốn làm việc thật với người thật, không phải dự án mô phỏng? Có chịu được cảm giác chưa có câu trả lời ngay? Lương cứng khởi điểm có phải điều khiến bạn chùn bước? Canh đúng từng nhịp qua khe hở hẹp — giống cách bạn cần canh đúng câu trả lời thành thật cho chính mình.',
    mech:'Bấm nhẹ, canh đúng thời điểm.'},
   {ctaVerb:'Rẽ nhánh',ctaIcon:'🚀',
    hook:'Chặng cuối — nơi mọi kỹ năng bạn vừa rèn ở 5 chặng trước dồn lại làm một. SoE là một trong những vị trí có ROI sự nghiệp cao nhất tại Việt Nam, nếu đi đúng cách: ở lại tech thành SoE Lead/Principal, rẽ sang Product, Enterprise Sales, hay tự khởi nghiệp — hơn 5 hướng đi đang mở ra từ đúng vị trí này. Giữ nhịp điềm tĩnh, mọi ngã rẽ đang chờ ngay phía trước.',
    mech:'Mọi loại chướng ngại trộn lẫn — giữ nhịp bấm ổn định.'}
 ];
 function buildIntro(container,cfg,i,onStart){
   var avKey=getArchetype()||'technician', av=ARCH_QUIZ.data[avKey];
   var ig=INTRO[i]||INTRO[0];
   container.innerHTML=
     '<div class="game-intro" style="background:linear-gradient(160deg,'+cfg.sky1+','+cfg.sky2+')">'+
       '<div class="gi-head">'+
         '<div class="gi-icon" style="background:'+av.color+'"><svg><use href="'+av.icon+'"/></svg></div>'+
         '<div><b class="gi-title">Chặng '+(i+1)+'/6 · '+cfg.name+'</b><span class="gi-sub">Hoá thân: '+av.n+'</span></div>'+
       '</div>'+
       '<p class="gi-hook">'+ig.hook+'</p>'+
       '<p class="gi-desc">'+ig.mech+' Né qua thì hiện ngay tóm tắt nội dung, đâm phải thì mất sức chịu đựng — không thua ngay.</p>'+
       '<p class="gi-desc">Bạn có <b>100 điểm chịu đựng</b>, mỗi cú đâm −20. Chọn kỹ — ngoài đời đâu được chọn, ở đây thì có.</p>'+
       '<div class="gi-diagram">'+
         '<div class="gi-row good"><i class="gi-dot"></i>Né qua chướng ngại → hiện tóm tắt, tính điểm</div>'+
         '<div class="gi-row bad"><i class="gi-dot"></i>Đâm phải chướng ngại → −20 sức chịu đựng</div>'+
       '</div>'+
       '<div class="gi-meta">'+
         '<span>🎯 Mục tiêu: '+cfg.target+' chướng ngại</span>'+
         '<span>💪 Thua vẫn chơi lại, không mất tiến trình</span>'+
         '<span>⌨️ Bấm / chạm / phím Space</span>'+
       '</div>'+
       '<button class="btn btn-dark gi-cta" type="button">'+ig.ctaVerb+' '+ig.ctaIcon+'</button>'+
     '</div>';
   container.querySelector('.gi-cta').addEventListener('click',onStart);
 }

 function buildStatic(container,cfg,i,onWin){
   var avKey=getArchetype()||'technician', av=ARCH_QUIZ.data[avKey];
   var labels=cfg.labels||[]; var need=labels.length||5; var count=0;
   container.innerHTML=
     '<div class="flappy-static" style="background:linear-gradient(160deg,'+cfg.sky1+','+cfg.sky2+')">'+
       '<div class="icon"><svg><use href="#i-target"/></svg></div>'+
       '<b>Giai đoạn '+(i+1)+' · '+cfg.name+'</b>'+
       '<p class="who-line">Hoá thân: <b>'+av.n+'</b></p>'+
       '<p>Trình duyệt đang bật chế độ giảm chuyển động — bấm lần lượt để đi qua từng mục của giai đoạn này.</p>'+
       '<div class="tap-reveal" style="text-align:left;max-width:44ch;margin:0 auto 16px"></div>'+
       '<button class="tap-btn" type="button">Bấm để xem mục tiếp theo</button>'+
       '<div class="tap-count">Đã bấm 0/'+need+'</div>'+
     '</div>';
   var btn=container.querySelector('.tap-btn'),cnt=container.querySelector('.tap-count'),rv=container.querySelector('.tap-reveal');
   btn.addEventListener('click',function(){
     if(count>=need) return;
     var lb=labels[count];
     if(lb){
       var row=document.createElement('div');
       row.style.cssText='padding:8px 0;border-top:1px solid rgba(255,255,255,.15);font-size:.84rem';
       row.innerHTML='<b>✓ '+lb.t+'</b><br><span style="color:rgba(255,255,255,.7);font-size:.8rem">'+lb.d+'</span>';
       rv.appendChild(row);
     }
     count++; cnt.textContent='Đã bấm '+count+'/'+need;
     if(count>=need){ btn.disabled=true; onWin(); }
   });
 }

 var HINTS={
   fly:'Bấm / chạm / phím Space để bay — né qua từng cổng',
   run:'Bấm / chạm / phím Space để nhảy — né qua từng chướng ngại vật',
   weave:'Bấm để bay cao né vật cản dưới đất — thả ra để hạ thấp né vật cản trên trần',
   mix:'Bấm / chạm / phím Space để bay — vừa né cổng vừa né chướng ngại mặt đất',
   precision:'Bấm nhẹ, canh đúng nhịp — khe hở hẹp và dao động lên xuống',
   gauntlet:'Chặng cuối — mọi loại chướng ngại trộn lẫn, giữ nhịp bấm điềm tĩnh'
 };
 function buildGame(container,cfg,i,onWin){
   var mode=cfg.mode||'fly';
   var avKey=getArchetype()||'technician', av=ARCH_QUIZ.data[avKey];
   var hint = HINTS[mode]||HINTS.fly;
   container.innerHTML=
     '<div class="flappy mode-'+mode+'" style="background:linear-gradient(120deg,'+cfg.sky1+' 0%,'+cfg.sky2+' 100%)" tabindex="0" role="button" aria-label="Bấm hoặc nhấn phím cách để chơi, vượt qua giai đoạn '+(i+1)+'">'+
       sceneLayerHTML(i,cfg)+
       '<div class="flappy-health">'+
         '<span class="hp-label">CHỊU ĐỰNG</span>'+
         '<span class="hp-track"><i class="hp-grad"></i><i class="hp-mask"></i></span>'+
         '<span class="hp-num">100</span>'+
       '</div>'+
       '<div class="flappy-hud"><span class="flvl">Giai đoạn '+(i+1)+'/6 · '+cfg.name+'<br><span class="who">Hoá thân: '+av.n+'</span></span>'+
         '<span class="hud-right"><span class="cnt">0/'+cfg.target+'</span>'+
           '<button class="flappy-sound" type="button" aria-label="'+(soundOn?'Tắt âm thanh':'Bật âm thanh')+'"><svg><use href="'+(soundOn?'#i-vol':'#i-mute')+'"/></svg></button>'+
         '</span>'+
       '</div>'+
       '<div class="flappy-toast" aria-live="polite"></div>'+
       '<div class="flappy-streak" aria-live="polite"></div>'+
       '<i class="flappy-trail" style="background:'+av.color+';opacity:.22"></i>'+
       '<i class="flappy-trail" style="background:'+av.color+';opacity:.1"></i>'+
       '<div class="flappy-bird"><svg><use href="'+av.icon+'"/></svg></div>'+
       '<div class="flappy-ground"></div>'+
       '<div class="flappy-hint">'+hint+'</div>'+
     '</div>';
   var root=container.querySelector('.flappy');
   var bird=root.querySelector('.flappy-bird');
   var cntEl=root.querySelector('.cnt');
   var toastEl=root.querySelector('.flappy-toast');
   var streakEl=root.querySelector('.flappy-streak');
   var trailEls=root.querySelectorAll('.flappy-trail');
   var hpMask=root.querySelector('.hp-mask'), hpNum=root.querySelector('.hp-num');
   var H,W,birdY,birdV,obstacles,score,health,invulnT,running,started,startedAt,rafId,lastT,sinceSpawn,toastTimer,streak,yHist,streakTimer;
   var ceilLethal = mode!=='run';
   var floorLethal = mode==='fly' || mode==='precision';
   var TOP_SAFE=82; // vùng an toàn cho chữ HUD (thanh chịu đựng + tên chặng) — chướng ngại không được vẽ vào đây

   function size(){ H=root.clientHeight; W=root.clientWidth; }
   function updateHealthUI(){
     hpMask.style.width=(100-health)+'%';
     hpNum.textContent=health;
   }
   function reset(){
     size();
     birdY = mode==='run' ? H-6-38 : H/2-19;
     birdV=0; obstacles=[]; score=0; health=100; invulnT=0; running=true; started=false; startedAt=null; lastT=null; sinceSpawn=0; streak=0; yHist=[];
     cntEl.textContent='0/'+cfg.target;
     bird.style.top=birdY+'px'; bird.style.transform='rotate(0deg)';
     root.querySelectorAll('.flappy-pipe,.flappy-msg').forEach(function(n){ n.remove(); });
     toastEl.classList.remove('on');
     streakEl.classList.remove('on');
     trailEls.forEach(function(t){ t.style.top=birdY+'px'; });
     updateHealthUI();
   }
   function takeHit(){
     if(invulnT>0||!running) return;
     health=Math.max(0,health-20); updateHealthUI(); invulnT=.8;
     root.classList.remove('hit'); void root.offsetWidth; root.classList.add('hit');
     SFX.hit();
     streak=0;
     if(health<=0) endGame(false);
   }
   function showStreak(n){
     clearTimeout(streakTimer);
     streakEl.textContent='🔥 Chuỗi '+n+' liên tiếp!';
     streakEl.classList.add('on');
     streakTimer=setTimeout(function(){ streakEl.classList.remove('on'); },1500);
   }
   function labelFor(idx){ return cfg.labels ? cfg.labels[idx % cfg.labels.length] : null; }
   function pickKind(){
     if(mode==='fly') return 'gap';
     if(mode==='run') return 'ground';
     if(mode==='precision') return Math.random()<.78 ? 'gap':'drone';
     if(mode==='weave') return Math.random()<.22 ? 'drone' : (Math.random()<.5 ? 'ceil':'ground');
     if(mode==='mix') return Math.random()<.22 ? 'drone' : (Math.random()<.55 ? 'gap':'ground');
     if(mode==='gauntlet'){ var r=Math.random(); if(r<.25) return 'drone'; return r<.55 ? 'gap' : (r<.8 ? 'ground':'ceil'); }
     return 'gap';
   }
   function spawnObstacle(idx){
     var lb=labelFor(idx);
     var labelHTML = lb ? '<span class="pipe-label">'+lb.t+'</span>' : '';
     var kind=pickKind(), o;
     if(kind==='gap'){
       var gapPx=Math.max(90,H*cfg.gap);
       var botMargin=24, minGapTop=TOP_SAFE+40;
       var gapTop=minGapTop+Math.random()*Math.max(20,(H-6-gapPx-botMargin-minGapTop));
       var top=document.createElement('div'); top.className='flappy-pipe top';
       top.style.background=cfg.pipe; top.style.top=TOP_SAFE+'px'; top.style.height=(gapTop-TOP_SAFE)+'px';
       var bottom=document.createElement('div'); bottom.className='flappy-pipe bottom';
       bottom.style.background=cfg.pipe; bottom.style.height=(H-6-gapTop-gapPx)+'px'; bottom.innerHTML=labelHTML;
       root.appendChild(top); root.appendChild(bottom);
       o={kind:'gap',x:W,gapTop:gapTop,gapPx:gapPx,top:top,bottom:bottom,passed:false,label:lb,age:0,
          oscillate:(mode==='precision'||mode==='gauntlet')};
       top.style.transform='translateX('+o.x+'px)'; bottom.style.transform='translateX('+o.x+'px)';
     }else if(kind==='ceil'){
       var hangH=Math.max(46,Math.min(H*.42,H*.22+Math.random()*H*.16));
       var top2=document.createElement('div'); top2.className='flappy-pipe top';
       top2.style.background=cfg.pipe; top2.style.top=TOP_SAFE+'px'; top2.style.height=hangH+'px'; top2.innerHTML=labelHTML;
       root.appendChild(top2);
       o={kind:'ceil',x:W,hangH:hangH,top:top2,passed:false,label:lb};
       top2.style.transform='translateX('+o.x+'px)';
     }else if(kind==='drone'){
       var droneY=TOP_SAFE+Math.random()*Math.max(20,H-6-32-48-TOP_SAFE);
       var el=document.createElement('div'); el.className='flappy-drone';
       el.innerHTML='<svg style="color:'+cfg.pipe+'"><use href="#i-spark"/></svg>';
       root.appendChild(el);
       o={kind:'drone',x:W,y:droneY,baseY:droneY,amp:26+Math.random()*22,freq:1.6+Math.random()*1.3,w:32,el:el,passed:false,label:lb,age:0};
       el.style.transform='translate('+o.x+'px,'+o.y+'px)';
     }else{
       var blockH=Math.max(46,Math.min(H*.42,H*.24+Math.random()*H*.16));
       var block=document.createElement('div'); block.className='flappy-pipe bottom';
       block.style.background=cfg.pipe; block.style.height=blockH+'px'; block.innerHTML=labelHTML;
       root.appendChild(block);
       o={kind:'ground',x:W,blockH:blockH,bottom:block,passed:false,label:lb};
       block.style.transform='translateX('+o.x+'px)';
     }
     obstacles.push(o);
   }
   function flap(){
     if(!running){ reset(); rafId=requestAnimationFrame(loop); return; }
     if(!started){ started=true; startedAt=(window.performance?performance.now():Date.now()); spawnObstacle(0); }
     birdV = mode==='run' ? -420 : -330;
     bird.classList.remove('flapping'); void bird.offsetWidth; bird.classList.add('flapping');
     SFX.flap();
   }
   function showToast(lb){
     if(!lb) return;
     clearTimeout(toastTimer);
     toastEl.innerHTML='<b>✓ '+lb.t+'</b><span>'+lb.d+'</span>';
     toastEl.classList.add('on');
     toastTimer=setTimeout(function(){ toastEl.classList.remove('on'); },2200);
   }
   function endGame(win){
     running=false;
     cancelAnimationFrame(rafId);
     var msg=document.createElement('div'); msg.className='flappy-msg';
     if(win){
       var hitsTaken=Math.round((100-health)/20);
       var elapsedSec=startedAt?(((window.performance?performance.now():Date.now())-startedAt)/1000):0;
       stageStats[i]={hits:hitsTaken,time:elapsedSec,archetype:avKey};
       saveStageStats();
       var statLine='<span class="stat-badge">💥 '+hitsTaken+' lần vấp</span><span class="stat-badge">⏱ '+elapsedSec.toFixed(1)+'s</span>';
       msg.innerHTML='<div class="icon"><svg><use href="#i-check"/></svg></div><b>Vượt qua giai đoạn '+(i+1)+'!</b><p>Điềm đạm mà chắc chắn — đúng chất SoE. Nội dung đã mở khoá bên dưới.</p><div class="stat-line">'+statLine+'</div>';
       root.appendChild(msg);
       SFX.win();
       burstConfetti(root, i===5?42:18, [cfg.pipe, av.color, '#fff']);
       if(window.soeGA) soeGA('level_cleared',{level_index:i+1,level_name:cfg.name,hits:hitsTaken,time_sec:Math.round(elapsedSec)});
       setTimeout(onWin,900);
     }else{
       msg.innerHTML='<div class="icon"><svg><use href="#i-x"/></svg></div><b>Đã hết sức chịu đựng — hít thở rồi thử lại.</b><p>Bấm bất kỳ đâu để chơi lại. Không mất tiến trình các giai đoạn trước.</p>';
       root.appendChild(msg);
       SFX.lose();
       if(window.soeGA) soeGA('level_failed',{level_index:i+1,level_name:cfg.name});
     }
   }
   function render(dt){
     if(!running||!started) return;
     if(invulnT>0) invulnT-=dt;
     birdV+=950*dt; birdY+=birdV*dt;
     bird.style.top=birdY+'px';
     bird.style.transform='rotate('+Math.max(-25,Math.min(70,birdV/12))+'deg)';
     yHist.unshift(birdY); if(yHist.length>7) yHist.pop();
     trailEls[0].style.top=(yHist[3]!=null?yHist[3]:birdY)+'px';
     trailEls[1].style.top=(yHist[6]!=null?yHist[6]:birdY)+'px';
     if(ceilLethal && birdY<=TOP_SAFE){ birdY=TOP_SAFE; birdV=200; takeHit(); if(!running) return; }
     if(birdY>=H-6-38){
       if(floorLethal){ birdY=H-6-38; birdV=-200; takeHit(); if(!running) return; }
       else { birdY=H-6-38; birdV=0; } // mặt đất là điểm tựa, không phải điểm chết
     }

     sinceSpawn+=dt;
     var spawnEvery=Math.max(1.15,300/cfg.speed);
     if(sinceSpawn>=spawnEvery){ sinceSpawn=0; spawnObstacle(obstacles.length); }

     for(var k=obstacles.length-1;k>=0;k--){
       var o=obstacles[k];
       o.x-=cfg.speed*dt;
       o.age=(o.age||0)+dt;
       var birdLeft=56,birdRight=56+38,birdTop=birdY,birdBottom=birdY+38;
       var ow=o.w||60;
       var pipeLeft=o.x,pipeRight=o.x+ow;
       var hit;
       if(o.kind==='drone'){
         o.y=Math.max(TOP_SAFE,Math.min(H-6-32,o.baseY+Math.sin(o.age*o.freq)*o.amp));
         o.el.style.transform='translate('+o.x+'px,'+o.y+'px)';
         if(!o.passed && birdRight>pipeLeft && birdLeft<pipeRight){
           hit = (birdBottom>o.y && birdTop<o.y+32);
         }
       }else{
         var yOff = o.oscillate ? Math.sin(o.age*2.1)*Math.min(26,H*.06) : 0;
         var tx='translateX('+o.x+'px)'+(yOff?' translateY('+yOff+'px)':'');
         if(o.top) o.top.style.transform=tx;
         if(o.bottom) o.bottom.style.transform=tx;
         if(!o.passed && birdRight>pipeLeft && birdLeft<pipeRight){
           if(o.kind==='gap') hit = (birdTop<o.gapTop+yOff || birdBottom>o.gapTop+yOff+o.gapPx);
           else if(o.kind==='ceil') hit = birdTop<TOP_SAFE+o.hangH;
           else hit = birdBottom>H-6-o.blockH;
         }
       }
       if(hit){ o.passed=true; takeHit(); if(!running) return; }
       if(!o.passed && pipeRight<birdLeft){
         o.passed=true; score++; cntEl.textContent=score+'/'+cfg.target;
         streak++;
         showToast(o.label);
         SFX.pass();
         if(streak>=3 && streak%3===0) showStreak(streak);
         if(score>=cfg.target){ endGame(true); return; }
       }
       if(o.x<-80){ if(o.top) o.top.remove(); if(o.bottom) o.bottom.remove(); if(o.el) o.el.remove(); obstacles.splice(k,1); }
     }
   }
   function loop(ts){
     if(!lastT) lastT=ts;
     var dt=Math.min(.05,(ts-lastT)/1000); lastT=ts;
     render(dt);
     if(running) rafId=requestAnimationFrame(loop);
   }
   root.addEventListener('click',flap);
   root.addEventListener('keydown',function(e){ if(e.code==='Space'||e.code==='Enter'){ e.preventDefault(); flap(); } });
   root.querySelector('.flappy-sound').addEventListener('click',function(e){ e.stopPropagation(); setSoundOn(!soundOn); if(window.soeGA) soeGA('click_zone',{zone:'sound-toggle'}); });
   reset();
   rafId=requestAnimationFrame(loop);
 }

 var gateBuilt={};
 function ensureStage(i){
   if(gateBuilt[i]) return;
   var id=TAB_IDS[i],section=document.getElementById(id),cfg=LEVELS[i];
   var gate=section.querySelector('.stage-gate');
   if(i<window.__soeProgress){ gate.classList.add('stage-hidden'); showContent(section); gateBuilt[i]=true; if(i===5) buildRecap(); return; }
   var onWin=function(){ clearStage(i); };
   function startGateGame(){ if(reduce){ buildStatic(gate,cfg,i,onWin); } else { buildGame(gate,cfg,i,onWin); } }
   function startWithIntro(){ buildIntro(gate,cfg,i,startGateGame); }
   gateBuilt[i]=true;
   if(i===0 && !getArchetype()){ buildArchSelect(gate,startWithIntro); return; }
   startWithIntro();
 }

 /* ẩn nội dung chưa mở khoá ngay (rẻ, không cần đo kích thước) — nhưng CHỈ dựng game
    (buildGame cần đo clientHeight/Width) cho tab đang thật sự hiển thị, để tránh
    tab còn display:none cho ra kích thước 0 lúc khởi tạo. Các tab khác dựng lười
    khi activateTab() thật sự chuyển tới, qua sự kiện soe:tabchange. */
 TAB_IDS.forEach(function(id,i){
   var section=document.getElementById(id);
   if(i<window.__soeProgress){ section.querySelector('.stage-gate').classList.add('stage-hidden'); showContent(section); gateBuilt[i]=true; if(i===5) buildRecap(); }
   else{ hideContent(section); }
 });
 var activeSection=document.querySelector('.tabpanel-main.on');
 if(activeSection){ var activeIdx=TAB_IDS.indexOf(activeSection.id); if(activeIdx>-1) ensureStage(activeIdx); }
 window.addEventListener('soe:tabchange',function(e){
   var idx=TAB_IDS.indexOf(e.detail.id);
   if(idx>-1) ensureStage(idx);
 });

 updatePills();
})();
