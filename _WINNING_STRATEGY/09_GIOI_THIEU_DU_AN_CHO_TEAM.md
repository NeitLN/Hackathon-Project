# BÙA — Giới thiệu dự án cho cả team

> **Đọc file này trước tiên.** Các file `01`–`08` là tài liệu chiến lược chi tiết bằng tiếng Anh, rất dày. File này là bản tóm tắt tiếng Việt để mọi thành viên — kể cả không làm kỹ thuật — hiểu đúng dự án và nói đúng khi gặp giám khảo.

---

## 1. Một phút hiểu dự án

**BÙA là một "két sắt có người canh" trên Solana, dành cho người Việt mới dùng crypto.**

Bạn cất tiền vào két BÙA. Mỗi lần có giao dịch muốn rút tiền ra khỏi két:

1. Mạng Solana **mô phỏng** giao dịch đó (chạy thử, chưa thật) để biết chính xác nó sẽ làm gì.
2. Bộ giải mã của tụi mình **bóc tách** ra: chuyển bao nhiêu, cho ai, có cấp quyền gì không.
3. **AI giải thích bằng tiếng Việt dễ hiểu**: *"Giao dịch này chuyển toàn bộ 250 USDC của bạn tới một địa chỉ bạn chưa từng gửi, và cho phép địa chỉ đó rút thêm không giới hạn trong tương lai."*
4. Nếu nguy hiểm → **Guardian của BÙA không bỏ phiếu đồng ý** → giao dịch không đủ phiếu → không chạy được.

**Slogan:** *"Scam gõ cửa. Bùa đóng cửa."* — Cảnh báo chỉ nói. BÙA thì chặn.

**Thi:** Track 1 — Best Product & Business · Chủ đề: Consumer dApps

---

## 2. Vấn đề chúng ta giải quyết

- Việt Nam đứng **thứ 4 thế giới** về mức độ dùng crypto (~$220 tỷ giá trị on-chain/năm).
- Từ 2026, sàn được cấp phép sẽ đưa **hàng triệu người Việt lần đầu** vào thị trường.
- Người mới là **mục tiêu số 1 của scammer**: token rác, phishing, ví giả, sàn ma.
- **Mọi công cụ bảo vệ hiện có đều bằng tiếng Anh và chỉ là cảnh báo** — Blowfish, Blockaid... Người dùng bấm "Confirm" vì không đọc được, và cảnh báo thì luôn bấm bỏ qua được.

**Insight cốt lõi của dự án:**
> Cảnh báo bắt một người mới, đang hoảng, phải tự ra quyết định của chuyên gia — và luôn có thể bấm bỏ qua. Vấn đề không phải là thiếu thông tin, mà là **hiểu biết và quyền quyết định nằm chung một bàn tay**. BÙA tách hai thứ đó ra.

---

## 3. Sản phẩm hoạt động thế nào (giải thích cho người không rành kỹ thuật)

Két BÙA cần **2 trên 3 chữ ký** mới mở được. Ba "người giữ chìa":

| Chìa | Ai giữ | Quyền |
|---|---|---|
| **Ví nóng** (điện thoại bạn) | Người dùng | Đầy đủ — tạo lệnh, bỏ phiếu, thực thi |
| **Guardian của BÙA** | BÙA (server) | **Chỉ được bỏ phiếu.** Không tạo được lệnh, không thực thi được |
| **Chìa dự phòng offline** | Người dùng (cất riêng, giấy/thiết bị) | Đầy đủ |

Từ đó có 4 tính chất, và đây là **linh hồn của sản phẩm**:

- ✅ **Điện thoại bị hack một mình không rút được tiền** — mới có 1 phiếu, cần 2.
- ✅ **BÙA không thể ăn cắp tiền** — chỉ có quyền bỏ phiếu, một phiếu không bao giờ đủ.
- ✅ **BÙA không thể khóa người dùng lại** — ví nóng + chìa dự phòng = 2 phiếu, tự đi mà không cần BÙA.
- ✅ **Mất ví nóng vẫn cứu được** — Guardian + chìa dự phòng = 2 phiếu.

### Hai luồng — phải phân biệt rõ

| Luồng | Ai duyệt | BÙA có phân tích không? |
|---|---|---|
| **Bình thường (được bảo vệ)** | Ví nóng + **Guardian** | **CÓ** — Guardian chỉ bỏ phiếu sau khi mô phỏng, giải mã, chấm rủi ro |
| **Khẩn cấp (phá kính)** | Ví nóng + **chìa dự phòng** | **KHÔNG** — cố ý bỏ qua, cần cầm chìa lạnh trong tay |

Chìa dự phòng là **lối thoát hiểm có chủ đích**, để BÙA sập hay biến mất cũng không giam tiền người dùng. Giá phải trả là nó cũng bỏ qua lớp bảo vệ — và **tụi mình nói thẳng điều đó**, không giấu.

---

## 4. Ai làm gì trong hệ thống (chia trách nhiệm kỹ thuật)

```
Người dùng tạo lệnh chuyển tiền
        ↓
[Solana RPC]        ← MÔ PHỎNG giao dịch (chạy thử, ra số dư trước/sau)
        ↓
[Bộ giải mã]        ← BÓC TÁCH: chương trình nào, chuyển bao nhiêu, cấp quyền gì
        ↓
[Luật cứng]         ← CHẶN THẲNG các mẫu chắc chắn nguy hiểm (không cần AI)
        ↓
[AI risk engine]    ← CHẤM ĐIỂM rủi ro + GIẢI THÍCH tiếng Việt
        ↓
[Policy engine]     ← QUYẾT ĐỊNH: có thả phiếu của Guardian không
        ↓
[Guardian Service]  ← KÝ phiếu (đây là service, KHÔNG phải AI)
        ↓
[Squads v4 on-chain] ← CHỈ ÉP một điều: đủ 2/3 phiếu mới chạy được
```

**Bốn điều tuyệt đối không được nhầm:**

1. **AI không mô phỏng giao dịch.** Solana RPC mô phỏng. AI chỉ đọc kết quả rồi giải thích.
2. **AI không bao giờ giữ hay dùng private key.** Guardian Service mới là bên ký.
3. **AI không có quyền quyết định cuối với tiền.** Luật cứng chặn trước; AI chỉ chấm điểm và giải thích.
4. **Blockchain không phát hiện scam.** Squads chỉ ép "đủ 2/3 phiếu". Việc phát hiện nằm off-chain, ở phía tụi mình.

---

## 5. ⚠️ Ranh giới BẮT BUỘC phải nói đúng

Đây là phần dễ mất điểm nhất trước giám khảo. Nói sai một câu là bị bắt bài.

### ❌ TUYỆT ĐỐI KHÔNG ĐƯỢC NÓI

| Câu sai | Vì sao sai |
|---|---|
| "BÙA bảo vệ ví của bạn" | BÙA **chỉ bảo vệ tài sản nằm trong két BÙA**. Ký drainer từ ví Phantom thường thì BÙA không thấy, không chặn được. |
| "Mọi giao dịch đều phải qua Guardian duyệt" | Sai. Ví nóng + chìa dự phòng đủ 2/3, chạy được mà không cần BÙA. |
| "Không thể chạy nếu Guardian không duyệt" | Sai, lý do như trên. |
| "AI của tụi mình mô phỏng giao dịch" | Solana RPC mô phỏng. AI giải thích. |
| "Blockchain phát hiện/chặn scam" | Blockchain chỉ ép điều kiện đủ phiếu. |
| "Bảo vệ 100%, không thể bị lừa" | Vẫn có false negative. Nói thế là gian. |
| "Hỗ trợ mọi giao dịch Solana" | MVP chỉ hỗ trợ 6 loại lệnh (xem §6). Còn lại **fail-closed** — không duyệt. |
| Gọi giao dịch RISKY là "giao dịch thất bại on-chain" | Chỉ được gọi vậy **nếu thật sự có signature + program error đã confirm**. Nếu không, phải nói đúng: "đề xuất không đạt đủ phiếu". |
| Bất kỳ con số user/doanh thu/đối tác không có thật | Chưa có user thì nói "chưa có user, đây là kế hoạch test trên campus". |

### ✅ ĐƯỢC NÓI (đều đúng và chứng minh được)

- "Điện thoại bị hack một mình không chuyển được tiền **trong két BÙA**."
- "Tụi mình không lấy được tiền của bạn — Guardian chỉ có quyền bỏ phiếu."
- "Tụi mình không khóa bạn lại được — chìa dự phòng của chính bạn là thành viên thứ ba."
- "Ở luồng bình thường, đề xuất bị policy từ chối sẽ không có phiếu của Guardian, nên không đủ ngưỡng **theo đường đó**."
- "Mọi câu giải thích đều bắt nguồn từ kết quả mô phỏng thật của đúng giao dịch này."

---

## 6. MVP hỗ trợ những loại giao dịch nào

Chỉ 6 loại, giải mã được chắc chắn. Ngoài danh sách này → **UNSUPPORTED → không duyệt** (fail-closed).

| # | Chương trình | Lệnh | Vì sao có mặt |
|---|---|---|---|
| 1 | System | `Transfer` | Chuyển SOL ra khỏi két |
| 2 | SPL Token | `Transfer` / `TransferChecked` | Chuyển token ra khỏi két |
| 3 | SPL Token | `Approve` / `ApproveChecked` | **Ủy quyền — chiêu drainer kinh điển** |
| 4 | SPL Token | `SetAuthority` | Chiếm quyền tài khoản |
| 5 | SPL Token | `CloseAccount` | Quét sạch rồi đóng tài khoản |
| 6 | ATA | `Create` | Lành tính, cần cho việc chuyển token |

Thà nói "tụi mình chưa hiểu loại giao dịch này nên không duyệt", còn hơn giả vờ hiểu.

---

## 7. Demo trên sân khấu diễn ra thế nào

Hai đề xuất trên cùng một két, chạy liền nhau. **Khoảnh khắc gây ấn tượng phải đến trước giây thứ 90.**

### Đề xuất AN TOÀN
1. Chụp số dư két **trước**
2. Tạo đề xuất trên Devnet (chuyển 10 token)
3. Guardian đọc từ chain → mô phỏng → giải mã → chấm điểm
4. Hiện giải thích tiếng Việt cạnh số liệu mô phỏng
5. Guardian **đồng ý** → đủ ngưỡng → **thực thi thành công**
6. **Bằng chứng:** chữ ký trên Explorer + **số dư két thay đổi đúng bằng số đã chuyển**

### Đề xuất NGUY HIỂM
1. Chụp số dư két **trước**
2. Tạo đề xuất `Approve` ủy quyền **không giới hạn** cho địa chỉ lạ
3. Mô phỏng → hiện hậu quả bằng tiếng Việt, mỗi câu gắn với một dữ kiện đã giải mã
4. Guardian **gửi lệnh từ chối lên chain** (`proposalReject` — đã xác nhận SDK có hỗ trợ)
5. **Không đủ ngưỡng** → không thực thi được
6. **Bằng chứng:** chữ ký từ chối trên Explorer + **số dư và trường delegate của két không đổi**, kiểm tra trực tiếp

Câu chốt: *"Cả hai đều là đề xuất thật trên Devnet. Đây là chữ ký."*

**Không bao giờ được giả:** kết quả mô phỏng, phán quyết AI, lệnh từ chối, giao dịch thành công, mọi thứ trên Explorer.
**Được đơn giản hóa (nhưng phải nói to lên):** ví và két nạp sẵn, threat DB gieo sẵn, luồng khôi phục chỉ mô tả chứ không diễn.

---

## 8. Vai trò từng người

| Vai trò | Việc chính | File nên đọc kỹ |
|---|---|---|
| **Dev Lead** | Squads 2-of-3, Guardian Service, đọc proposal từ chain, thực thi | `06`, `07`, `08` |
| **AI Engineer** | Bộ giải mã, luật cứng, structured output, giải thích tiếng Việt, đánh giá | `04` §3, `06` §6 |
| **Frontend/Product** | UI tiếng Việt, kết nối ví, luồng nạp két, màn hình giải thích | `04` §8, `05` §2 |
| **Product Lead** | PRD, user journey, ưu tiên tính năng, chốt copy tiếng Việt | `04`, `05` §1 |
| **Business/GTM** | Phỏng vấn 15–20 người, market memo, mô hình doanh thu, pitch | `05` §7, `01` |
| **Research/Ops** | Bộ dữ liệu đánh giá, threat DB, tài liệu, checklist tuân thủ | `06` §6, `05` §10 |

> **Lưu ý:** market memo (phỏng vấn người dùng thật) chiếm **25% rubric Track 1** — quan trọng ngang code. Đây cũng là việc **duy nhất không thể dồn vào phút chót**.

---

## 9. Tình trạng hiện tại (cập nhật 12/08/2026)

| Hạng mục | Trạng thái |
|---|---|
| Nghiên cứu cuộc thi, chọn ý tưởng, chốt kiến trúc | ✅ Xong |
| Roadmap 24h / 48h / 72h, pitch, Q&A, checklist | ✅ Xong |
| Squads v4 sống trên Devnet | ✅ Đã xác minh — `SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf` |
| **I0 spike (8 tiêu chí kỹ thuật)** | ⛔ **Đang kẹt** — ví devnet chưa có SOL |
| Code sản phẩm BÙA | ⬜ **Chưa bắt đầu** (đúng quy trình — chưa qua I0 thì chưa code UI) |

### Ba việc cần làm ngay

1. **Xác nhận với BTC:** hạn nộp bài thật (U4), thi bảng trường hay bảng vãng lai (U6). Hạn nộp quyết định dùng roadmap 24h hay 72h.
2. **Nạp ví devnet** rồi chạy lại spike:
   ```bash
   solana airdrop 2 F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg --url devnet
   solana balance F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg --url devnet   # phải > 0
   cd spike-i0 && node spike.mjs
   ```
3. **Đặt lịch 10 buổi phỏng vấn người dùng trên trường tuần này** (GTM).

---

## 10. Từ điển thuật ngữ

| Từ | Nghĩa dễ hiểu |
|---|---|
| **Devnet** | Mạng thử nghiệm của Solana. Tiền ở đây là tiền giả, không có giá trị. Cuộc thi bắt buộc dùng devnet. |
| **Vault (két)** | Tài khoản giữ tài sản, do smart contract quản lý chứ không do một người nào giữ. |
| **Multisig / ngưỡng (threshold)** | Cần nhiều chữ ký mới mở được. "2-of-3" = 3 người giữ chìa, cần bất kỳ 2 người đồng ý. |
| **Squads v4** | Bộ smart contract multisig có sẵn trên Solana, đã được audit, đang giữ ~$10 tỷ. Tụi mình **dùng lại** chứ không tự viết. |
| **Proposal (đề xuất)** | Một giao dịch được đề nghị nhưng chưa chạy, đang chờ đủ phiếu. |
| **Simulate (mô phỏng)** | Chạy thử giao dịch trên node để biết kết quả, **không** ghi lên blockchain. |
| **Approve / delegate (ủy quyền)** | Cho phép người khác rút token của bạn sau này. Ủy quyền **không giới hạn** = chiêu lừa phổ biến nhất. |
| **Explorer** | Trang web tra cứu mọi giao dịch trên Solana. Đây là "bằng chứng công khai" của demo. |
| **Fail-closed** | Khi không chắc chắn thì **từ chối**, không phải cho qua. Nguyên tắc an toàn cốt lõi. |
| **False positive / negative** | Chặn nhầm giao dịch tốt / bỏ lọt giao dịch xấu. Cả hai đều có thể xảy ra, và tụi mình thừa nhận công khai. |

---

## 11. Đọc tiếp gì

| File | Nội dung |
|---|---|
| `00_STATE.md` | Trạng thái hiện tại, luôn xem đầu tiên |
| `01_OPUS_COMPETITION_BRIEF.md` | Nghiên cứu cuộc thi, rubric, đối thủ |
| `03_OPUS_FINAL_DECISION.md` | Vì sao chọn BÙA, vì sao loại 2 ý tưởng kia |
| `04_WINNING_BLUEPRINT.md` | Thiết kế sản phẩm đầy đủ |
| `05_BUILD_DEMO_AND_PITCH_PLAN.md` | Roadmap 24/48/72h, pitch script, Q&A, checklist |
| `06_TECHNICAL_REALITY_CHECK.md` | **Kiến trúc đã chốt** — file có thẩm quyền cao nhất về kỹ thuật |
| `07` + `08` | Spec và kết quả của I0 spike |

---

**Nguyên tắc xuyên suốt dự án:**
> Nói đúng những gì hệ thống thật sự làm được. Một đội tự nêu ra giới hạn của mình sẽ ăn điểm cao hơn một đội tuyên bố hoàn hảo — và không bao giờ bị giám khảo bắt bài.
